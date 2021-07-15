const mongoose = require("mongoose");

const productReviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: [true, "Rating can not be empty."],
    min: [1, "Rating must be 1 or above."],
    max: [5, "Rating must be 5 or belove."],
  },
  text: String,
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

const ProductReview = mongoose.model("ProductReview", productReviewSchema);

module.exports = ProductReview;
