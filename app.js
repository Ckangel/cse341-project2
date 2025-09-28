const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Only load dotenv in local/dev, not in Render (Render injects env vars directly)
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes (update path to routes inside garden-planner-api)
const gardenRoutes = require("./garden-planner-api/routes/gardenRoutes");
app.use("/api/garden", gardenRoutes);

// MongoDB connection
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("❌ No MongoDB URI found in environment variables");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

module.exports = app;
