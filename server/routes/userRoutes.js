const express = require("express");
const {
  signup,
  login,
  requireAuth,
  logout,
} = require("../controllers/authController");
const {
  getAllUser,
  getUser,
  updateUser,
} = require("../controllers/userController");
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

// // middleware for protected routs
router.use(requireAuth);

router.get("/", getAllUser);
router.patch(
  "/updateMe",
  generateRules("email", "firstName", "lastName", "phone"),
  validate,
  updateUser
);
router.get("/:userID", getUser);
router.delete("/deleteMe", "delete");
// router.put("/:userID/password", "updatePassword");
// router.post("/forgetPassword", "forgetPassword");

module.exports = router;
