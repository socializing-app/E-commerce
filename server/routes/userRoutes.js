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
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const { generateRules, validate } = require("../utils/validators");

const router = express.Router();

router.post(
  "/signup",
  generateRules("email", "password"),
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
  generateRules("email"),
  validate,
  updateUser
);
router.get("/:userID", getUser);
router.delete("/deleteMe", deleteUser);
// router.put("/:userID/password", "updatePassword");
// router.post("/forgetPassword", "forgetPassword");

module.exports = router;
