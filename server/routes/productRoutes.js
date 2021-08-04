const express = require("express");
const {
  generateFakeProducts,
  generateCategories,
  getProduct,
  getProducts
} = require("../controllers/productController");

const router = express.Router();

router.post("/seed/", generateFakeProducts);
router.post("/seed/cat", generateCategories);
router.get("/:productID", getProduct);
router.get("", getProducts);

module.exports = router;
