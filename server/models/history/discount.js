const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema(
  {
    discountName: {
      type: String,
      required: [true, "Discount name is required."],
    },
    discountValue: {
      type: String,
      required: [true, "Discount value is required."],
    },
    couponCode: {
      type: String,
      required: [true, "Coupon code is required."],
    },
    validUntil: {
      type: Date,
      required: [true, "Expiration date is required."],
    },
    minimumOrderValue: {
      type: Number,
      default: null,
    },
    maximumAmount: {
      type: Number,
      default: null,
    },
    maximumUsagePerItem: {
      type: Number,
      default: 1,
    },
    maximumUsagePerUser: {
      type: Number,
      default: 1,
    },
    redeemable: {
      type: Boolean,
      default: false,
    },
    timesApplied: Number,
  },
  {
    timestamps: true,
  }
);

const Discount = mongoose.model("Discount", discountSchema);

module.exports = Discount;
