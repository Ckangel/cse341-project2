/**
 * Middleware to ensure user has required role(s).
 * Usage: ensureRole('admin'), ensureRole(['admin', 'editor'])
 */
module.exports = function ensureRole(allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res
        .status(401)
        .json({ error: "Unauthorized: No user role found" });
    }

    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: `Forbidden: Requires one of [${roles.join(", ")}]` });
    }

    next();
  };
};
