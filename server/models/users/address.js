const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema(
  {
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postcode: {
        type: String,
        required: true
    },
    addressLine1: {
        type: String,
        required: true
    },
    addressLine2: {
        type: String,
        required: false
    },
    county: {
        type: String,
        required: false
    }
  },
  {
    timestamps: true,
  },
)

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;