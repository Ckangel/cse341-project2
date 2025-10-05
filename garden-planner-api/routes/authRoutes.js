const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const ensureAuth = require("../../middleware/ensureAuth");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/logout", ensureAuth, authController.logoutUser);

module.exports = router;
