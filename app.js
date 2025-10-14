require("dotenv").config();
console.log("🌱 Garden Planner API initializing");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("./garden-planner-api/config/passport");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const path = require("path");

const app = express();

// Serve Swagger JSON directly
app.get("/swagger.json", (req, res) => {
  res.sendFile(path.resolve(__dirname, "swagger.json"));
});

// Connect to MongoDB
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

app.use(cookieParser());

// Session config, adjust cookie settings per environment
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_session_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

// Initialize Passport and sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/users", require("./garden-planner-api/routes/userRoutes"));
app.use("/api/gardens", require("./garden-planner-api/routes/gardenRoutes"));
app.use("/api/auth", require("./garden-planner-api/routes/authRoutes"));

// Swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health Checks
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    message: "Garden Planner API is healthy",
  });
});

app.get("/api/db-status", (req, res) => {
  const stateNames = [
    "disconnected",
    "connected",
    "connecting",
    "disconnecting",
  ];
  res.status(200).json({ status: stateNames[mongoose.connection.readyState] });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
