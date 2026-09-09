const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const otpGenerator = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6 digit otp
};
const otpExpiryGenerator = () => {
  return new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes
};

exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send("All fields are required");
    }
    if (password.length < 6) {
      return res
        .status(400)
        .send("Password must be at least 6 characters long");
    }
    if (username.length < 3) {
      return res
        .status(400)
        .send("username must be at least 3 characters long");
    }
    if (
      email &&
      !email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ) {
      return res
        .status(400)
        .json({ message: "Please provide a valid email address" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const otp = otpGenerator();
    const otpExpiry = otpExpiryGenerator();
    const user = await User.create({
      username,
      email,
      password,
      otp,
      otpExpiry,
    });
    res.status(201).json({ message: "User registered successfully", user });

    // otp sending logic
    try {
      await sendEmail({
        to: email,
        subject: "OTP Verification for AI Cold Email Generator",
        text: `Your OTP for AI Cold Email Generator is ${otp}. It will expire in 10 minutes.`,
      });
    } catch (error) {
      res.status(400).json({
        message: "Error sending OTP (nodemailer)",
        error: error.message,
      });
    }
  } catch (error) {
    next(error);
    res
      .status(400)
      .json({ message: "Error registering user", error: error.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    if (user.isVerified) {
      return res
        .status(400)
        .json({ message: "User already verified. Please login." });
    }

    if (!user.otp || !user.otpExpiry) {
      return res
        .status(400)
        .json({ message: "No OTP found. Please register again." });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const token = generateToken(user._id);

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: token,
      message: "Email verified successfully!",
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error verifying OTP", error: error.message });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email }).select("+password +isVerified"); // include password and verification fields for comparison
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    if (!user.isVerified) {
      return res.status(400).json({ message: "User is not verified" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      user: { username: user.username, email: user.email },
      token: token,
    });
  } catch (error) {
    next(error);
    res.status(400).json({ message: "Error logging in", error: error.message });
  }
};
