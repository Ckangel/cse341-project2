const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const ensureAuth = require("../middleware/ensureAuth");

// Start GitHub OAuth login
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// GitHub OAuth callback
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    // On success
    res.redirect("/dashboard"); // Or send JSON response
  }
);

// Logout route
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: "Logged out successfully" });
  });
});

// Example protected profile route
router.get("/profile", ensureAuth, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
