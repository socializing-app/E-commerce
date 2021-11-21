const express = require("express");
const controller = require("../controllers/utils");

const router = express.Router();

router.post("/seed/", controller.generateProducts);
router.post("/seed/cat", controller.generateCategories);

module.exports = router;