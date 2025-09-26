const express = require("express");
const router = express.Router();

const gardenController = require("../controllers/gardenController");
const validateGarden = require("../middleware/validateGarden");
const ensureAuth = require("../middleware/ensureAuth");

router.use(ensureAuth);

/**
 * @swagger
 * /api/gardens:
 *   get:
 *     summary: Get all gardens
 *     tags: [Gardens]
 *     responses:
 *       200:
 *         description: A list of gardens
 *       401:
 *         description: Unauthorized
 */
router.get("/", gardenController.getGardens);

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
 *     responses:
 *       200:
 *         description: Garden found
 *       404:
 *         description: Garden not found
 *       401:
 *         description: Unauthorized
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
 *             $ref: '#/components/schemas/Garden'
 *     responses:
 *       201:
 *         description: Garden created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", validateGarden, gardenController.createGarden);

/**
 * @swagger
 * /api/gardens/{id}:
 *   put:
 *     summary: Update a garden
 *     tags: [Gardens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Garden'
 *     responses:
 *       200:
 *         description: Garden updated successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", validateGarden, gardenController.updateGarden);

/**
 * @swagger
 * /api/gardens/{id}:
 *   delete:
 *     summary: Delete a garden
 *     tags: [Gardens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Garden deleted successfully
 *       500:
 *         description: Server error
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", gardenController.deleteGarden);

module.exports = router;
