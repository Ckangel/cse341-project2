const express = require("express");
const router = express.Router();
const gardenController = require("../controllers/gardenController");

/**
 * @swagger
 * tags:
 *   name: Gardens
 *   description: Garden management
 */

/**
 * @swagger
 * /api/garden:
 *   get:
 *     summary: Get all gardens
 *     tags: [Gardens]
 *     responses:
 *       200:
 *         description: List of gardens
 */
console.log(gardenController);
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
 * /api/gardens:
 *   post:
 *     summary: Create a new garden
 *     tags: [Gardens]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - location
 *               - size
 *               - soilType
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
 *       400:
 *         description: Validation error
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
 *     summary: Delete a garden by ID
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
 *         description: Garden deleted
 *       404:
 *         description: Garden not found
 */
router.delete("/:id", gardenController.deleteGarden);

module.exports = router;
