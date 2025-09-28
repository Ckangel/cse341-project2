const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String, index: true, unique: true, sparse: true },
  email: { type: String, required: true, unique: true },
  displayName: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  bio: { type: String },
  preferences: {
    notifications: { type: Boolean, default: true },
    theme: { type: String, default: "light" },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
