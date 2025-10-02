const express = require("express");
const router = express.Router();
const gardenController = require("../controllers/gardenController");
const ensureAuth = require("../../middleware/ensureAuth");
const ensureRole = require("../../middleware/ensureRole");

/**
 * @swagger
 * tags:
 *   name: Gardens
 *   description: Garden management
 */

// Protected routes first
router.get("/private", ensureAuth, (req, res) => {
  res.json({ message: "This is a protected garden view", user: req.user });
});

router.post("/add", ensureAuth, ensureRole("admin"), (req, res) => {
  res.json({ message: "Garden added successfully", data: req.body });
});

/**
 * @swagger
 * /api/gardens:
 *   get:
 *     summary: Get all gardens
 *     tags: [Gardens]
 *     responses:
 *       200:
 *         description: List of gardens
 */
router.get("/", gardenController.getAllGardens);

/**
 * @swagger
 * /api/gardens/{id}:
 *   get:
 *     summary: Get a garden by ID
 *     tags: [Gardens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Garden ID
 *     responses:
 *       200:
 *         description: Garden object
 *       404:
 *         description: Garden not found
 */
router.get("/:id", gardenController.getGardenById);

/**
 * @swagger
 * /api/gardens/add:
 *   post:
 *     summary: Create a garden (admin only)
 *     tags: [Gardens]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               size:
 *                 type: number
 *               soilType:
 *                 type: string
 *               plants:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Garden created
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin only)
 */
router.post("/", gardenController.createGarden);

/**
 * @swagger
 * /api/gardens/{id}:
 *   put:
 *     summary: Update a garden by ID
 *     tags: [Gardens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Garden ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               size:
 *                 type: number
 *               soilType:
 *                 type: string
 *               plants:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Garden updated
 *       404:
 *         description: Garden not found
 */
router.put("/:id", gardenController.updateGarden);

/**
 * @swagger
 * /api/gardens/{id}:
 *   delete:
 *     summary: Delete a garden by ID (admin only)
 *     tags: [Gardens]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Garden ID
 *     responses:
 *       200:
 *         description: Garden deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin only)
 *       404:
 *         description: Garden not found
 */
router.delete(
  "/:id",
  ensureAuth,
  ensureRole("admin"),
  gardenController.deleteGarden
);

module.exports = router;
