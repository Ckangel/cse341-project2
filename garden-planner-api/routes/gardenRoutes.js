const express = require("express");
const router = express.Router();

const gardenController = require("../controllers/gardenController");
const ensureAuth = require("../../middleware/ensureAuth");
const ensureRole = require("../../middleware/ensureRole");
// const ensureAuth = require("../../middleware/Auth");

/**
 * @swagger
 * tags:
 *   name: Gardens
 *   description: Garden management
 */

// Public Routes

router.get("/", gardenController.getAllGardens);

router.get("/:id", gardenController.getGardenById);

// Protected Routes

router.post("/", ensureAuth, gardenController.createGarden);

router.put("/:id", ensureAuth, gardenController.updateGarden);

router.delete(
  "/:id",
  ensureAuth,
  ensureRole("admin"),
  gardenController.deleteGarden
);

// Additional Protected Test Routes

router.get("/private", ensureAuth, (req, res) => {
  res.json({ message: "This is a protected garden view", user: req.user });
});

router.post("/add", ensureAuth, ensureRole("admin"), (req, res) => {
  res.json({ message: "Garden added successfully", data: req.body });
});

module.exports = router;
