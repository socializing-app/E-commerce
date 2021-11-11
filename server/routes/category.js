const express = require("express");
const { getCategories, addCategory } = require("../controllers/category");

const router = express.Router();

router.post("/new", addCategory);
router.get("/all", getCategories);

module.exports = router;