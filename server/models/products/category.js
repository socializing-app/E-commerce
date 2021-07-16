const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name is required."],
  },
  discountID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discount",
    },
  ],
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
