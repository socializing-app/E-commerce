const mongoose = require("mongoose");
const validator = require("validator");

const User = new mongoose.Schema({
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
  password: {
    type: String,
    required: [true, "Please provide a password."],
    minlength: [8, "The minimum length for password is 8 charachter."],
    validate: {
      validator: validator.isStrongPassword,
      message: "Please provide a valid password.",
    },
  },
});

module.exports = User;
