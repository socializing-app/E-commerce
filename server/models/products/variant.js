const mongoose = require('mongoose')

const variantSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        unique: true
    },
    colour: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: [
        {
            type: String,
            required: true
        }
    ]
  },
  {
    timestamps: true,
  },
)

const Variant = mongoose.model('Variant', variantSchema);
module.exports = Variant;