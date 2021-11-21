const { ProductReview, Product } = require("../../models");
const { catchErrorMiddleware } = require("../../middleware/catcherror");

// Return all reviews
const reviews = async (req, res) => {
    const reviews = await ProductReview.find().populate("user").populate("product");
    
    return res.status(200).json(reviews);
}

// Return all reviews where the product rate is at least 4.5
const featuredReviews = async (req, res) => {
    const reviews = await ProductReview.find({ productRate: { $gte: 4.5 } }).populate("user").populate("product");
    
    return res.status(200).json(reviews);
}

// Return all reviews for a requested product
const productReviews = async (req, res) => {
    const { id } = req.params;
    const reviews = await ProductReview.find({ product: id }).populate("user");

    return res.status(200).json(reviews);
}

// Add a new review and calculate a new rate for the products
const add = async (req, res) => {
    const { productRate, deliveryRate, experienceRate, text, product, user } = req.body;

    const newReview = await ProductReview.create({ productRate, deliveryRate, experienceRate, text, product, user });
    const reviewProduct = await Product.findById(product);
    const reviewsForProduct = await ProductReview.find({ product }).lean();

    const rateSum = reviewsForProduct.reduce((total, current) => total + current.productRate, 0);
    const rate = Math.round(( rateSum / reviewsForProduct.length ) * 10) / 10;

    reviewProduct.rate = rate;
    reviewProduct.reviews = [ ...reviewProduct.reviews, product ];

    reviewProduct.save();

    return res.status(200).json(newReview);
}

exports.getFeaturedReviews = catchErrorMiddleware(featuredReviews);
exports.getReviews = catchErrorMiddleware(reviews);
exports.getProductReviews = catchErrorMiddleware(productReviews);
exports.addReview = catchErrorMiddleware(add);