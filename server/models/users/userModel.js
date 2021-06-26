const mongoose = require("mongoose");
const validator = require("validator");

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
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email address.",
      },
    },
    profileImagePath: {
      type: String,
      default: "avatar.jpg",
    },
    phone: {
      type: String,
      validate: {
        validator: validator.isMobilePhone,
        message: "Please provide a valid phone number",
      },
    },
    countryCode: {
      type: String, // example GB, HU, US
      required: [true, "countryCode is required."],
    },
    carrierCode: {
      type: String, // example +44 for GB
      required: [true, "carrierCode is required."],
    },
    password: {
      type: String,
      required: [true, "Please provide a password."],
      minlength: [8, "The minimum length for password is 8 charachter."],
      validate: {
        validator: validator.isStrongPassword,
        message: "Please provide a valid password.",
      },
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Password confirmation field is required."],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "The passwords do not match.",
      },
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

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
