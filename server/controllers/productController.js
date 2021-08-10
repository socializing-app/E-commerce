const faker = require("faker");
const {
  Product,
  Variant,
  Stock,
  ProductReview,
  Category,
  SubCategory,
  Brand,
} = require("../models");

exports.getProducts = async (req, res, next) => {
  try {
    const condition = req.query.condition || null;
    const manufacturer = req.query.manufacturer || null;
    const model = req.query.model || null;
    const active = req.query.active || null;
    const tags = req.query.tags || null;
    const minPrice = req.query.minprice || null;
    const maxPrice = req.query.maxprice || null;
    const colour = req.query.colour || null;
    const name = req.query.name || null;
    const categoryID = req.query.category || null;

    const productQuery = {};
    const variantQuery = {};

    if ( condition ) productQuery.condition = condition;
    if ( manufacturer ) productQuery.manufacturer = { $regex : new RegExp(manufacturer, "i") };
    if ( model ) productQuery.model = { $regex : new RegExp(model, "i") };
    if ( active ) productQuery.active = active;
    if ( tags ) productQuery.tags = { $in: [ ...tags.split(",") ] };
    if ( categoryID ) productQuery.category = categoryID;

    productQuery.variants = { $exists: true, $ne: [] };

    if ( minPrice && maxPrice ) variantQuery.price = { "$gte": minPrice, "$lte": maxPrice };
    else if ( minPrice ) variantQuery.price = { "$gte": minPrice };
    else if ( maxPrice ) variantQuery.price = { "$lte": maxPrice };

    if ( colour ) variantQuery.colour = { $regex : new RegExp(colour, "i") };
    if ( name ) variantQuery.name = { $regex : new RegExp(name, "i") };

    const productsFromDB = await Product.find(productQuery).populate({ "path": "variants", "match": variantQuery })
    
    let length = 0;
    const products = productsFromDB.filter((product) => {
      length += product.variants.length;
      return product.variants.length;
    });

    return res.status(200).json({ products, length });
  } catch (error) {
    return next({ error });
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();

    return res.status(200).json({ categories });
  } catch (error) {
    return next({ error });
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const { productID } = req.params;
    const product = await Product.findById(productID).populate(
      "variants brandID subCategoryID"
    );

    if (!product) {
      return next({
        statusCode: 404,
        message: "The product does not exists.",
      });
    }

    const relatedProducts = await Product.find({
      category: product.category._id,
      subCategory: product.subCategory._id,
    }).limit(10);

    const reviews = await ProductReview.find({ product: productID })
      .populate("user")
      .limit(5);

      console.log(reviews)

    return res.status(200).json({
      product,
      reviews: reviews || [],
      relatedProducts: relatedProducts || [],
    });
  } catch (error) {
    console.log(error);
    return next({ error });
  }
};

exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await ProductReview.find();

    return res.status(200).json(reviews);
  } catch (error) {
    return next({error});
  }
} 

exports.generateFakeProducts = async (req, res, next) => {
  try {
    const PRODUCT_COUNT = 10;
    const VARIANT_COUNT = 2;
    const REVIEW_COUNT = 2;
    let productData;
    for (let i = 0; i < PRODUCT_COUNT; i++) {
      productData = {
        thumbnail: faker.image.imageUrl(),
        manufacturer: faker.company.companyName(),
        model: faker.commerce.department(),
        description: faker.commerce.productDescription(),
        condition: "new",
        active: true,
        tags: [
          faker.commerce.product(),
          faker.commerce.product(),
          faker.commerce.product(),
        ],
      };
      console.log("before product");
      const newProduct = await Product.create(productData);
      console.log("after product");

      const productStockData = {
        product: newProduct._id,
        quantity: faker.datatype.number(),
      };
      console.log("before stock");
      await Stock.create(productStockData);
      console.log("after stock");

      let variantData;
      for (let y = 0; y < VARIANT_COUNT; y++) {
        variantData = {
          name: faker.commerce.product(),
          colour: faker.commerce.color(),
          price: faker.commerce.price(),
          images: [
            faker.image.imageUrl(),
            faker.image.imageUrl(),
            faker.image.imageUrl(),
            faker.image.imageUrl(),
          ],
        };
        console.log("before variant");
        const newVariant = await Variant.create(variantData);
        console.log("after variant");
        newProduct.variants.push(newVariant._id);
        await newProduct.save();
      }
      let reviewData;
      for (let x = 0; x < REVIEW_COUNT; x++) {
        reviewData = {
          productRate: Math.floor(Math.random() * 5) + 1,
          deliveryRate: Math.floor(Math.random() * 5) + 1,
          experienceRate: Math.floor(Math.random() * 5) + 1,
          text: faker.lorem.paragraphs(3),
          product: newProduct._id,
        };
        console.log("before productReview");
        await ProductReview.create(reviewData);
        console.log("after productReview");
      }
    }

    return res.send("Products were created successfully.");
  } catch (error) {
    console.log(error);
    return res.send("Generating products failed.");
  }
};

exports.generateCategories = async (req, res, next) => {
  try {
    // product points to subcategories
    const categoryOne = await Category.create({ name: "Category One" });
    const categoryTwo = await Category.create({ name: "Category Two" });

    const subCatOne = await SubCategory.create({
      name: "SubCat One",
      category: categoryOne._id,
    });
    const subCatTwo = await SubCategory.create({
      name: "SubCat Two",
      category: categoryOne._id,
    });
    const subCatThree = await SubCategory.create({
      name: "SubCat Three",
      category: categoryTwo._id,
    });
    const subCatFour = await SubCategory.create({
      name: "SubCat Four",
      category: categoryTwo._id,
    });

    const brandOne = await Brand.create({ name: "Brand One" });
    const brandTwo = await Brand.create({ name: "Brand Two" });

    const productsOne = await Product.find({}).limit(10);
    const productsTwo = await Product.find({}).skip(10);

    productsOne.forEach(async (product) => {
      product.category = categoryOne._id;
      product.subCategory = subCatTwo._id;
      product.brand = brandOne._id;
      await product.save();
    });

    productsTwo.forEach(async (product) => {
      product.category = categoryTwo._id;
      product.subCategory = subCatFour._id;
      product.brand = brandTwo._id;
      await product.save();
    });

    return res.send("Categories were created successfully");
  } catch (error) {
    console.log(error);
    return res.send("Generating categories failed.");
  }
};
