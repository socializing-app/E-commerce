const mongoose = require("mongoose");

const productReviewSchema = new mongoose.Schema(
  {
    productRate: {
      type: Number,
      required: [true, "productRate is required."],
      min: [1, "Rating must be 1 or above."],
      max: [5, "Rating must be 5 or below."],
    },
    deliveryRate: {
      type: Number,
      required: [true, "deliveryRate is required."],
      min: [1, "Rating must be 1 or above."],
      max: [5, "Rating must be 5 or below."],
    },
    experienceRate: {
      type: Number,
      required: [true, "experienceRate is required."],
      min: [1, "Rating must be 1 or above."],
      max: [5, "Rating must be 5 or below."],
    },
    text: String,
    images: [
      {
        type: String,
      },
    ],
    video: [{ type: String }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
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
