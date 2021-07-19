const mongoose = require("mongoose");

const orderHistorySchema = new mongoose.Schema({
  shipmentDate: {
    type: Date,
    required: [true, "Shipment date is required."],
  },
  paymentDate: {
    type: Date,
    required: [true, "Payment date is required."],
    default: Date.now(),
  },
  invoiceNumber: {
    type: String,
    required: [true, "Invoice number is required."],
  },
  status: {
    type: String,
    required: [true, "Status is required."],
    enum: {
      values: ["pending", "completed", "failed"],
      message: "Status is either: pending, completed, or failed.",
    },
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  addressID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  paymentID: {},
  shipmentMethodID: {},
  discountID: {},
});

const OrderHistory = mongoose.model("OrderHistory", orderHistorySchema);

module.exports = OrderHistory;
