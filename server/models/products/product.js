const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    lowercasename: {
      type: String
    },
    baseprice: {
      type: Number,
      required: true
    },
    thumbnail: {
      type: String
    },
    manufacturer: {
      type: String
    },
    model: {
      type: String
    },
    description: {
      type: String,
      required: true
    },
    condition: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    },
    tags: [
      {
        type: String
      }
    ],
    variants: [
      {
        colour: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        images: [
          {
            type: String,
            required: true
          }
        ]
      }
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductReview" }],
    discounts: [{}],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
