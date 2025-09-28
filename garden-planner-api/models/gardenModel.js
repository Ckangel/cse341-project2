// gardenModel.js
const mongoose = require("mongoose");

const gardenSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: { type: String },
    size: { type: Number }, // in sq meters
    plants: [{ type: String }],
    soilType: { type: String },
    lastWateredAt: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Garden", gardenSchema);
