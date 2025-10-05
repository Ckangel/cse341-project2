/**
 * @swagger
 * /api/middleware/ensure-auth:
 *   get:
 *     summary: Authenticated access only
 *     tags: [Auth Middleware]
 *     security:
 *       - cookieAuth: []
 *     description: |
 *       This route is protected by `ensureAuth` middleware. It requires the user to be logged in.
 *       If not authenticated, the server responds with 401 Unauthorized.
 *     responses:
 *       200:
 *         description: Access granted
 *       401:
 *         description: Unauthorized
 */

/**
 * Middleware to ensure user is authenticated.
 * If authenticated, calls next middleware/route handler.
 * Otherwise, responds with 401 Unauthorized error.
 */
function ensureAuth(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized: Please log in first." });
}

module.exports = ensureAuth;
