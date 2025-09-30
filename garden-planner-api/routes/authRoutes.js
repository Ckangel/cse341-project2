const express = require("express");
const router = express.Router();

// Controllers
const authController = require("../controllers/authController");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and OAuth operations
 */

/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     summary: Start Google OAuth login
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to Google login
 */
router.post("/register", authController.registerUser);

/**
 * @swagger
 * /api/auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: OAuth successful, user logged in
 *       401:
 *         description: Unauthorized
 */
router.post("/login", authController.loginUser);

/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged out
 */
router.post("/logout", authController.logoutUser);

// Optional: refresh token
router.post("/refresh-token", authController.refreshToken);

module.exports = router;
