const mongoose = require("mongoose");

const productReviewSchema = new mongoose.Schema(
  {
    productRate: {
      type: Number,
      required: [true, "productRate is required."],
      min: [1, "Rating must be 1 or above."],
      max: [5, "Rating must be 5 or belove."],
    },
    deliveryRate: {
      type: Number,
      required: [true, "deliveryRate is required."],
      min: [1, "Rating must be 1 or above."],
      max: [5, "Rating must be 5 or belove."],
    },
    experienceRate: {
      type: Number,
      required: [true, "experienceRate is required."],
      min: [1, "Rating must be 1 or above."],
      max: [5, "Rating must be 5 or belove."],
    },
    text: String,
    images: [
      {
        type: String,
      },
    ],
    video: [{ type: String }],
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  {
    timestamps: true,
  }
);

const ProductReview = mongoose.model("ProductReview", productReviewSchema);

module.exports = ProductReview;
