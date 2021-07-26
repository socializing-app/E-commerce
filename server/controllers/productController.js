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
      .populate("userID")
      .limit(5);

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