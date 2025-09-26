const mongoose = require("mongoose");

const gardenSchema = new mongoose.Schema({
  name: String,
  layout: String,
  plantTypes: [String],
  wateringSchedule: String,
  sunlightNeeds: String,
  soilType: String,
  notes: String,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Garden", gardenSchema);

/**
 * @swagger
 * components:
 *   schemas:
 *     Garden:
 *       type: object
 *       required:
 *         - name
 *         - layout
 *         - plantTypes
 *         - wateringSchedule
 *         - sunlightNeeds
 *         - soilType
 *       properties:
 *         name:
 *           type: string
 *         layout:
 *           type: string
 *         plantTypes:
 *           type: array
 *           items:
 *             type: string
 *         wateringSchedule:
 *           type: string
 *         sunlightNeeds:
 *           type: string
 *         soilType:
 *           type: string
 *         notes:
 *           type: string
 */
