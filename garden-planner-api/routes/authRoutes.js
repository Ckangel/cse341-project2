const express = require("express");
const router = express.Router();
const passport = require("../config/passport"); // adjust path if needed
const ensureAuth = require("../../middleware/ensureAuth");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints via GitHub OAuth
 */

/**
 * @swagger
 * /api/auth/github:
 *   get:
 *     summary: Redirect to GitHub for OAuth login
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects user to GitHub authentication page
 */
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

/**
 * @swagger
 * /api/auth/github/callback:
 *   get:
 *     summary: GitHub OAuth callback URL
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects after successful or failed authentication
 *       401:
 *         description: Unauthorized - authentication failed
 */
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    // Redirect or respond post-login
    res.redirect("/dashboard"); // change to the desired URL or send JSON response
  }
);

/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     summary: Logout authenticated user
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       401:
 *         description: Unauthorized - if no user session exists
 */
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.clearCookie("connect.sid"); // Clear session cookie; adjust name if different
    res.json({ message: "Logged out successfully" });
  });
});

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Get logged-in user profile
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Authenticated user profile data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: Authenticated user's info
 *       401:
 *         description: Unauthorized - user not logged in
 */
router.get("/profile", ensureAuth, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
