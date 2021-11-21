const { Product, ProductReview, Category } = require("../../models");
const { catchErrorMiddleware } = require("../../middleware/catcherror");
const { uploadBase64ToAmazon } = require("../../utils/aws");

// Return all products based on requested filters
const products = async (req, res, next) => {
    const condition = req.query.condition || null;
    const manufacturer = req.query.manufacturer || null;
    const model = req.query.model || null;
    const active = req.query.active || null;
    const tags = req.query.tags || null;
    const minPrice = req.query.minprice || null;
    const maxPrice = req.query.maxprice || null;
    const rate = req.query.rate || null;
    const name = req.query.name || null;
    const categoryID = req.query.category || null;

    const productQuery = {};

    if ( condition ) productQuery.condition = condition;
    if ( manufacturer ) productQuery.manufacturer = { $regex : new RegExp(manufacturer, "i") };
    if ( model ) productQuery.model = { $regex : new RegExp(model, "i") };
    if ( active ) productQuery.active = active;
    if ( tags ) productQuery.tags = { $in: [ ...tags.split(",") ] };
    if ( categoryID ) productQuery.category = categoryID;
    if ( name ) productQuery.name = { $regex : new RegExp(name, "i") };
    if ( minPrice && maxPrice ) productQuery.baseprice = { "$gte": minPrice, "$lte": maxPrice };
    else if ( minPrice ) productQuery.baseprice = { "$gte": minPrice };
    else if ( maxPrice ) productQuery.baseprice = { "$lte": maxPrice };
    if ( rate ) productQuery.rate = { "$gte": rate };

    const productsFromDB = await Product.find(productQuery);
    
    let length = 0;
    const products = productsFromDB.filter((product) => {
        length += product.variants.length;
        return product.variants.length;
    });

    return res.status(200).json({ products, length });
}

// Add new product and upload images
const add = async (req, res, next) => {
    const { name, description, baseprice, condition, category, manufacturer, model } = req.body;
    const alternativeNames = [ name.toLowerCase(), name.replace(/[^a-zA-Z ]/g, ""), name.replace(/\s/g, ""), name.replace(/[^a-zA-Z ]/g, "").replace(/\s/g, "") ];

    const product = await Product.find({ lowercasename: { $in : alternativeNames } });
    
    if ( product && product.length ) {
        return next({ statusCode: 404, message: "The product with the provided name exists." });
    }

    const newProduct = {
        name,
        lowercasename: name.toLowerCase(),
        description,
        manufacturer,
        baseprice,
        model,
        condition,
        active: true,
        tags: []
    };

    const thumbnailLink = await uploadBase64ToAmazon(req.body.thumbnail[0], `thumbnail`);
    const thumbnail = thumbnailLink.link;
    const categoryID = await Category.find({ name: category }, '_id');
    const images = [];

    req.body.variants.filter((variant) => variant.images.length).forEach(async ( variant, index ) => {
        variant.images.forEach(async (image, ind) => images.push(uploadBase64ToAmazon(image, `image-name-${ind}`, `variant-${index}`)));
    });

    Promise.all(images).then(async (uploads) => {
    
        const variants = req.body.variants.map((variant, index) => {
            const variantImages = [];

            uploads.forEach(upload => {
                if ( +upload.id.split("-")[1] === index ) {
                    variantImages.push(upload.link);
                }
            })

            return {
                ...variant,
                images: variantImages
            }
        })

        newProduct.thumbnail = thumbnail;
        newProduct.variants = variants;
        newProduct.category = categoryID[0]._id;

        const addedProduct = await Product.create(newProduct);

        return res.status(200).json(addedProduct);
    });
}

// Return requested product
const product = async (req, res, next) => {
    const { productID } = req.params;
    const product = await Product.findById(productID).populate("reviews").lean();

    if (!product) {
        return next({
            statusCode: 404,
            message: "The product does not exists.",
        });
    }

    // Currently related products return the products under the same category
    const relatedProducts = await Product.find({ category: product.category._id }).limit(10);

    product.related = relatedProducts;
    const reviews = await ProductReview.find({ product: productID }).populate("user").limit(5);
    product.reviews = reviews;

    return res.status(200).json(product);
}

// Return all categories
const categories = async (req, res, next) => {
    const categories = await Category.find();

    return res.status(200).json({ categories });
}

exports.getCategories = catchErrorMiddleware(categories);
exports.getProduct = catchErrorMiddleware(product);
exports.addProduct = catchErrorMiddleware(add);
exports.getProducts = catchErrorMiddleware(products);