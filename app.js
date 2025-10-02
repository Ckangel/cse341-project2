console.log("App initialized");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

require("dotenv").config();

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

app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/users", require("./garden-planner-api/routes/userRoutes"));
app.use("/api/gardens", require("./garden-planner-api/routes/gardenRoutes"));
app.use("/api/auth", require("./garden-planner-api/routes/authRoutes"));

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/swagger.json", (req, res) => {
  res.status(200).json(swaggerSpec);
});

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    message: "Garden Planner API is healthy",
  });
});

// DB Health Check
app.get("/api/db-status", (req, res) => {
  const state = mongoose.connection.readyState;
  const status = ["disconnected", "connected", "connecting", "disconnecting"][
    state
  ];
  res.status(200).json({ status });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
