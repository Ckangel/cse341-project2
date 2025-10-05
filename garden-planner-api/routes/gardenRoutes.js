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

/**
 * @swagger
 * /api/gardens:
 *   get:
 *     summary: Retrieve all gardens
 *     tags: [Gardens]
 *     responses:
 *       200:
 *         description: List of all gardens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Garden'
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Garden'
 *       404:
 *         description: Garden not found
 */
router.get("/:id", gardenController.getGardenById);

/**
 * @swagger
 * /api/gardens:
 *   post:
 *     summary: Create a new garden
 *     tags: [Gardens]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GardenInput'
 *     responses:
 *       201:
 *         description: Garden created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Garden'
 *       401:
 *         description: Unauthorized
 */
router.post("/", ensureAuth, gardenController.createGarden);

/**
 * @swagger
 * /api/gardens/{id}:
 *   put:
 *     summary: Update garden by ID
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GardenInput'
 *     responses:
 *       200:
 *         description: Garden updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Garden'
 *       404:
 *         description: Garden not found
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", ensureAuth, gardenController.updateGarden);

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

// Additional Protected Test Routes

/**
 * @swagger
 * /api/gardens/private:
 *   get:
 *     summary: Example protected garden view
 *     tags: [Gardens]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Protected garden view
 */
router.get("/private", ensureAuth, (req, res) => {
  res.json({ message: "This is a protected garden view", user: req.user });
});

/**
 * @swagger
 * /api/gardens/add:
 *   post:
 *     summary: Example admin-only garden add
 *     tags: [Gardens]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Admin garden added
 */
router.post("/add", ensureAuth, ensureRole("admin"), (req, res) => {
  res.json({ message: "Garden added successfully", data: req.body });
});

module.exports = router;
