const mongoose = require("mongoose");

const gardenSchema = new mongoose.Schema(
  {
    name: String,
    layout: String,
    plantTypes: [String],
    wateringSchedule: String,
    sunlightNeeds: String,
    soilType: String,
    notes: String,
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Garden", gardenSchema);
