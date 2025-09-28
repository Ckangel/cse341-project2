const express = require('express');
const router = express.Router();

// Controllers
const gardenController = require('../controllers/gardenController');

// Middlewares
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Gardens
 *   description: Garden management and CRUD operations
 */

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

/**
 * @swagger
 * /api/gardens/{id}:
 *   get:
 *     summary: Get a garden by ID
 *     tags: [Gardens]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The garden ID
 *     responses:
 *       200:
 *         description: Garden object
 *       404:
 *         description: Garden not found
 */

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
 *             properties:
 *               name: { type: string }
 *               location: { type: string }
 *               size: { type: number }
 *               soilType: { type: string }
 *               plants: { type: array, items: { type: string } }
 *               createdAt: { type: string, format: date-time }
 *               updatedAt: { type: string, format: date-time }
 *     responses:
 *       201:
 *         description: Garden created
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/gardens/{id}:
 *   put:
 *     summary: Update a garden
 *     tags: [Gardens]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Garden updated
 *       404:
 *         description: Garden not found
 */

/**
 * @swagger
 * /api/gardens/{id}:
 *   delete:
 *     summary: Delete a garden
 *     tags: [Gardens]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Garden deleted
 *       404:
 *         description: Garden not found
 */

// Garden routes
router.get('/', auth, gardenController.getAllGardens);
router.get('/:id', auth, gardenController.getGardenById);
router.post('/', auth, validate, gardenController.createGarden);
router.put('/:id', auth, validate, gardenController.updateGarden);
router.delete('/:id', auth, gardenController.deleteGarden);

module.exports = router;
