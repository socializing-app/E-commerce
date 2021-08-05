const express = require("express");
const {
  generateFakeProducts,
  generateCategories,
  getProduct,
  getProducts,
  getCategories
} = require("../controllers/productController");

const router = express.Router();

router.post("/seed/", generateFakeProducts);
router.post("/seed/cat", generateCategories);
router.get("/:productID", getProduct);
router.get("", getProducts);
router.get("/category/all", getCategories);

module.exports = router;