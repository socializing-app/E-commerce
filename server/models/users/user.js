const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "firstName is required."],
    },
    lastName: {
      type: String,
      required: [true, "lastName is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
    },
    profileImagePath: {
      type: String,
      default: "avatar.jpg",
    },
    phone: String,
    countryCode: String, // example GB, HU, US
    carrierCode: String, // example +44 for GBd
    password: {
      type: String,
      required: [true, "Please provide a password."],
      minlength: [8, "The minimum length for password is 8 charachter."],
      select: false,
    },
    address: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
    shippingAddresID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    billingAddressID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],
    discounts: [{}],
    orders: [{}],
    productReviews: [{}],
    ordreReview: [{}],
    token: String,
    refreshToken: String,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
