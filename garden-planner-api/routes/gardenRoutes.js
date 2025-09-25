const express = require("express");
const router = express.Router();

const gardenController = require("../controllers/gardenController");
const validateGarden = require("../middleware/validateGarden");
const ensureAuth = require("../middleware/ensureAuth");

router.use(ensureAuth);

router.get("/", gardenController.getGardens);
router.get("/:id", gardenController.getGardenById);
router.post("/", validateGarden, gardenController.createGarden);
router.put("/:id", validateGarden, gardenController.updateGarden);
router.delete("/:id", gardenController.deleteGarden);

module.exports = router;
