const mongoose = require('mongoose')

const stockSchema = new mongoose.Schema(
  {
    productID: {},
    quantity: Number
  },
  {
    timestamps: true,
  },
)

const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;
