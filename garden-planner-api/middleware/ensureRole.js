module.exports = function ensureRole(role) {
  return function (req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    }
    res.status(403).json({ error: "Forbidden: Admins only" });
  };
};
