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
 *     summary: Retrieve all gardens (public)
 *     tags: [Gardens]
 *     security: []
 *     responses:
 *       200:
 *         description: List of gardens
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
 *     summary: Get a garden by ID (public)
 *     tags: [Gardens]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Garden ID
 *         required: true
 *         schema:
 *           type: string
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
 *     summary: Update a garden by ID
 *     tags: [Gardens]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Garden ID
 *         required: true
 *         schema:
 *           type: string
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
 *         description: Garden ID
 *         required: true
 *         schema:
 *           type: string
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
