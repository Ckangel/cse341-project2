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
//  app.use("/api/gardens", (req, res) => res.send("Garden route works"));
app.use("/auth", authRoutes);
app.use("/test", (req, res) => res.send("Test route works"));

// Error handling
app.use(errorHandler);

module.exports = app;
