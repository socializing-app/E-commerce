const express = require("express");
const controller = require("../controllers/products/reviews");

const router = express.Router();

router.get("/all", controller.getReviews);
router.get("/featured", controller.getFeaturedReviews);
router.get("/product/:id", controller.getProductReviews);
router.post("/new", controller.addReview);

module.exports = router;