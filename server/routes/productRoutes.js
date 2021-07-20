const express = require("express");
const { generateFakeProducts } = require("../controllers/productController");

const router = express.Router();

router.post("/seed/", generateFakeProducts);

module.exports = router;
