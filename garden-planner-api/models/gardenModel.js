const mongoose = require("mongoose");

const mongoose = require('mongoose');

const gardenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  layout: {
    type: String,
    enum: ['grid', 'rows', 'freeform'], // optional: restrict layout types
    required: true,
  },
  plantTypes: {
    type: [String],
    default: [],
  },
  wateringSchedule: {
    type: String,
    required: true,
  },
  sunlightNeeds: {
    type: String,
    required: true,
  },
  soilType: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Garden', gardenSchema);


module.exports = mongoose.model("Garden", gardenSchema);
