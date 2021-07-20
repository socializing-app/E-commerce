const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: Number,
  },
  {
    timestamps: true,
  }
);

const Stock = mongoose.model("Stock", stockSchema);
module.exports = Stock;
