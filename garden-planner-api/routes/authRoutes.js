const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const ensureAuth = require("../../middleware/ensureAuth");

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    // Redirect or respond with user info on success
    res.redirect("/dashboard"); // Update as needed
  }
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.json({ message: "Logged out successfully" });
  });
});

router.get("/profile", ensureAuth, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
