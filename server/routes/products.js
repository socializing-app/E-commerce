const express = require("express");
const controller = require("../controllers/products/product");

const router = express.Router();

router.get("/:productID", controller.getProduct);
router.get("", controller.getProducts);
router.post("/new", controller.addProduct);
router.get("/category/all", controller.getCategories);

module.exports = router;