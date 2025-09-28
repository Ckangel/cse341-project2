const mongoose = require("mongoose");

const gardenSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  size: { type: Number, required: true },
  soilType: { type: String, required: true },
  plants: [{ type: String }], // array of plant names
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Garden", gardenSchema);
