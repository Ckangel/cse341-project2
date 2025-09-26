require("dotenv").config(); // ✅ Load environment variables first

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

const { swaggerUi, swaggerSpec } = require("./config/swagger");
require("./config/passport"); // ✅ Load Passport config after dotenv

const gardenRoutes = require("./routes/gardenRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// ✅ MongoDB Connection
const mongoURI = process.env.MONGODB_URI;
console.log("MongoDB URI:", mongoURI); // Debug log
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ Middleware
app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback-secret", // ✅ Fix deprecated warning
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use("/api/gardens", gardenRoutes);
app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);

app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ✅ Error handling
app.use(errorHandler);

module.exports = app;
