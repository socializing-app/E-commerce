const express = require("express");
const {
  signup,
  login,
  requireAuth,
  logout,
} = require("../controllers/authController");
const { generateRules, validate } = require("../utils/validators");

const router = express.Router();

router.post(
  "/signup",
  generateRules("email", "password", "passwordConfirm"),
  validate,
  signup
);
router.post("/login", generateRules("email", "password"), validate, login);
router.post("/logout", logout);
// router.post("/forgetPassword", "forgetPassword");

// // middleware for protected routs
router.use("/auth", requireAuth);

router.get("/");
// router.get("/:userID", "getUser");
// router.put("/:userID/password", "updatePassword");
// router.patch("/:userID", "updateUser");
// router.delete("/:userID", "delete");

module.exports = router;
