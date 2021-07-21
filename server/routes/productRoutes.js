const express = require("express");
const {
  generateFakeProducts,
  generateCategories,
} = require("../controllers/productController");

const router = express.Router();

router.post("/seed/", generateFakeProducts);
router.post("/seed/cat", generateCategories);

module.exports = router;
