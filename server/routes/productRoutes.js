const express = require("express");
const {
  generateFakeProducts,
  generateCategories,
  getProduct,
  getProducts,
  getCategories,
  getReviews
} = require("../controllers/productController");

const router = express.Router();

router.post("/seed/", generateFakeProducts);
router.post("/seed/cat", generateCategories);
router.get("/:productID", getProduct);
router.get("", getProducts);
router.get("/category/all", getCategories);
router.get("/reviews/all", getReviews);

module.exports = router;