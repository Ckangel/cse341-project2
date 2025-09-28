const mongoose = require("mongoose");

module.exports = function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("❌ No MongoDB URI found in environment variables");
    process.exit(1);
  }

  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("✅ Connected to MongoDB");
    })
    .catch((err) => {
      console.error("❌ MongoDB connection error:", err);
      process.exit(1);
    });
};
