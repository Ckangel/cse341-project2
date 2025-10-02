module.exports = function ensureAuthRedirect(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login"); // or wherever your login page is
};
