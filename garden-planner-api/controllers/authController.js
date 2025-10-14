const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const SALT_ROUNDS = 10;

// (Optional) Register user with hashed password if you still support local registration
exports.registerUser = async (req, res) => {
  try {
    const { email, password, displayName, firstName, lastName } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = new User({
      email,
      password: hashedPassword,
      displayName,
      firstName,
      lastName,
      role: "user",
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// For GitHub OAuth, login is handled via Passport strategy and sessions.
// Thus, 'loginUser' endpoint is not needed.

// Logout clears the session cookie and calls passport logout
exports.logoutUser = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.clearCookie("connect.sid"); // default session cookie, adjust if changed
    res.json({ message: "Logged out successfully" });
  });
};
