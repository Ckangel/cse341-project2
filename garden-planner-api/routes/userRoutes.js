const express = require("express");
const router = express.Router();

// Middleware
const ensureAuth = require("../../middleware/Auth");
const validate = require("../../middleware/validate");

// Controller
const userController = require("../controllers/userController");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and CRUD operations
 */

// Public GET routes (no auth required)

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (public)
 *     tags: [Users]
 *     security: []  # no auth needed
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", userController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID (public)
 *     tags: [Users]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get("/:id", userController.getUserById);

// Protected routes

router.post("/", validate, userController.createUser);

router.put("/:id", ensureAuth, validate, userController.updateUser);

router.delete("/:id", ensureAuth, userController.deleteUser);

module.exports = router;