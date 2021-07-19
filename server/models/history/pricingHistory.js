const mongoose = require("mongoose");

const pricingHistorySchema = new mongoose.Schema(
  {
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    prices: [
      {
        price: Number,
        start: Date,
        end: {
          type: Date,
          default: null,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const PricingHistory = mongoose.model("PricingHistory", pricingHistorySchema);

module.exports = PricingHistory;
