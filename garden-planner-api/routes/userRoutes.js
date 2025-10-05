console.log("🔗 Binding PUT /api/users/:id to updateUser");

const express = require("express");
const router = express.Router();

// Middleware
const ensureAuth = require("../../middleware/Auth");
const validate = require("../../middleware/validate");

// Controller
const userController = require("../controllers/userController");

console.log("userController methods:", Object.keys(userController));

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and CRUD operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         _id:
 *           type: string
 *           description: MongoDB ObjectId
 *         googleId:
 *           type: string
 *         email:
 *           type: string
 *         displayName:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         role:
 *           type: string
 *           enum: [user, admin]
 *         bio:
 *           type: string
 *         preferences:
 *           type: object
 *           properties:
 *             notifications:
 *               type: boolean
 *             theme:
 *               type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */

// 🔐 Authenticated routes
router.get("/profile", ensureAuth, userController.getProfile);
//  router.put("/settings", ensureAuth, userController.updateSettings);

// 📘 Swagger: Get all users
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
router.get("/", ensureAuth, userController.getAllUsers);

// 📘 Swagger: Get user by ID
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
router.get("/:id", ensureAuth, userController.getUserById);

// 📘 Swagger: Create user
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error
 */
router.post("/", validate, userController.createUser);

// 📘 Swagger: Update user
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.put("/:id", ensureAuth, validate, userController.updateUser);

// 📘 Swagger: Delete user
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 */
router.delete("/:id", ensureAuth, userController.deleteUser);

module.exports = router;
