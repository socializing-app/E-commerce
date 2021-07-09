const express = require("express");
const {
  signup,
  login,
  requireAuth,
  logout,
} = require("../controllers/authController");
const { getAllUser, getUser } = require("../controllers/userController");
const { generateRules, validate } = require("../utils/validators");

const router = express.Router();

router.post(
  "/signup",
  generateRules("email", "password", "passwordConfirm"),
  validate,
  signup
);
router.post("/login", login);
router.post("/logout", logout);
// router.post("/forgetPassword", "forgetPassword");

// // middleware for protected routs
router.use(requireAuth);

router.get("/", getAllUser);
router.get("/:userID", getUser);
// router.put("/:userID/password", "updatePassword");
// router.patch("/:userID", "updateUser");
// router.delete("/:userID", "delete");

module.exports = router;
