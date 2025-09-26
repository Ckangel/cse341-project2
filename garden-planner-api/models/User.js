const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  provider: String,
  providerId: String,
  createdAt: { type: Date, default: Date.now },
});
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - provider
 *         - providerId
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         provider:
 *           type: string
 *         providerId:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */

module.exports = mongoose.model("User", userSchema);
