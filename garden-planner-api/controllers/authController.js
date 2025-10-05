const User = require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ error: "Email already in use" });

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({
      message: "User registered",
      user: { id: user._id, username, email },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Logout (client-side token discard)
exports.logoutUser = (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};

// Refresh token (optional)
exports.refreshToken = (req, res) => {
  const oldToken = req.headers.authorization?.split(" ")[1];
  if (!oldToken) return res.status(401).json({ error: "No token provided" });

  try {
    const payload = jwt.verify(oldToken, process.env.JWT_SECRET);
    const newToken = jwt.sign(
      { id: payload.id, role: payload.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token: newToken });
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
};
