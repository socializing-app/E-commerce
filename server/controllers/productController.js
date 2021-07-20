const faker = require("faker");
const { Product, Variant, Stock } = require("../models");

exports.generateFakeProducts = async (req, res, next) => {
  try {
    const PRODUCT_COUNT = 30;
    const VARIANT_COUNT = 3;
    const REVIEW_COUNT = 10;
    let productData;
    for (let i = 0; i < PRODUCT_COUNT; i++) {
      productData = {
        thumbnail: faker.image.imageUrl(),
        manufacturer: faker.company.companyName(),
        model: faker.commerce.department(),
        description: faker.commerce.productDescription(),
        condition: "new",
        active: true,
        tags: ["electronic", "new", "trend"],
      };
      const newProduct = await Product.create(productData);
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

        const newVariant = await Variant.create(variantData);
        newProduct.variants.push(newVariant._id);
        await newProduct.save();
      }
      let reviewData;
      for (let x = 0; x < REVIEW_COUNT; x++) {
        reviewData = {
          productRate: faker.datatype.number(5),
          deliveryRate: faker.datatype.number(5),
          experienceRate: faker.datatype.number(5),
          text: faker.lorem.paragraphs(3),
          productID: newProduct._id,
        };
        await ProductReview.create(reviewData);
      }

      const productStockData = {
        productID: newProduct._id,
        quantity: faker.datatype.number(),
      };
      await Stock.create(productStockData);
    }

    console.log(newProduct);

    return res.send("faking some data");
  } catch (error) {
    console.log(error);
    return res.send("faking went wrong");
  }
};
