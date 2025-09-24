// app.js
const express = require("express");
const cors = require("cors");
const gardenRoutes = require("./routes/gardenRoutes");

const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/gardens", gardenRoutes);
app.use("/auth", authRoutes);

// Error handling
app.use(errorHandler);

module.exports = app;
