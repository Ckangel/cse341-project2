const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failure",
    successRedirect: "/auth/success",
  })
);

router.get("/success", (req, res) => {
  res.json({ message: "Login successful", user: req.user });
});

router.get("/failure", (req, res) => {
  res.status(401).json({ error: "Login failed" });
});

module.exports = router;
