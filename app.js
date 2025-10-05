require("dotenv").config();
console.log("🌱 Garden Planner API initializing...");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5000",
      "https://cse341-project2-8cpj.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/users", require("./garden-planner-api/routes/userRoutes"));
app.use("/api/gardens", require("./garden-planner-api/routes/gardenRoutes"));
app.use("/api/auth", require("./garden-planner-api/routes/authRoutes"));

// Swagger UI and swagger.json endpoint
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/swagger.json", (req, res) => res.status(200).json(swaggerSpec));

// Health Checks
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    message: "Garden Planner API is healthy",
  });
});

app.get("/api/db-status", (req, res) => {
  const states = ["disconnected", "connected", "connecting", "disconnecting"];
  res.status(200).json({ status: states[mongoose.connection.readyState] });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
