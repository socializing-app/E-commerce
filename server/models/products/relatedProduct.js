const mongoose = require("mongoose");

const relatedProductSchema = new mongoose.Schema(
  {
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    relatedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Procut",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const RelatedProduct = mongoose.model("RelatedProduct", relatedProductSchema);

module.exports = RelatedProduct;
