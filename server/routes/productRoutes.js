const express = require("express");
const {
  generateFakeProducts,
  generateCategories,
  getProduct,
} = require("../controllers/productController");

const router = express.Router();

router.post("/seed/", generateFakeProducts);
router.post("/seed/cat", generateCategories);
router.get("/:productID", getProduct);

module.exports = router;
