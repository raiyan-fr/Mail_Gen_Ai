const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");

// Register a new user
router.post("/register", authController.registerUser);
// Login an existing user
router.post("/login", authController.loginUser);
// verify otp
router.post("/verify-otp", authController.verifyOtp);

module.exports = router;
