const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("You have successfully connected to the social-app database.");
  })
  .catch((err) => {
    console.log("You could not connect to the social-app database.", err);
  });

module.exports.Address = require("./users/address");
module.exports.Stock = require("./products/stock");
module.exports.Product = require("./products/product");
module.exports.Variant = require("./products/variant");
module.exports.Permission = require("./users/permission");
module.exports.User = require("./users/user");
module.exports.ProductReview = require("./products/productReview");
module.exports.SubCategory = require("./products/subCategory");
module.exports.Category = require("./products/category");
module.exports.Brand = require("./products/brand");
