const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        thumbnail: {
            type: String,
            required: true
        },
        manufacturer: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        condition: {
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            required: true
        },
        tags: [ 
            { 
                type: String 
            } 
        ],
        subCategoryID: {},
        variants: [{}],
        reviews: [{}],
        discounts: [{}]
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model("Product", productSchema);
module.exports = Product;