const Garden = require("../models/Garden");

// CREATE
exports.createGarden = async (req, res, next) => {
  try {
    const garden = new Garden({ ...req.body, ownerId: req.user._id });
    const savedGarden = await garden.save();
    res.status(201).json(savedGarden);
  } catch (err) {
    next(err);
  }
};

// READ ALL
exports.getGardens = async (req, res, next) => {
  try {
    const gardens = await Garden.find({ ownerId: req.user._id });
    res.json(gardens);
  } catch (err) {
    next(err);
  }
};

// READ ONE
exports.getGardenById = async (req, res, next) => {
  try {
    const garden = await Garden.findOne({
      _id: req.params.id,
      ownerId: req.user._id,
    });

    if (!garden) return res.status(404).json({ error: "Garden not found" });
    res.json(garden);
  } catch (err) {
    next(err);
  }
};

// UPDATE
exports.updateGarden = async (req, res, next) => {
  try {
    const updated = await Garden.findOneAndUpdate(
      { _id: req.params.id, ownerId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated)
      return res
        .status(404)
        .json({ error: "Garden not found or unauthorized" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE
exports.deleteGarden = async (req, res, next) => {
  try {
    const deleted = await Garden.findOneAndDelete({
      _id: req.params.id,
      ownerId: req.user._id,
    });
    if (!deleted)
      return res
        .status(404)
        .json({ error: "Garden not found or unauthorized" });
    res.json({ message: "Garden deleted successfully" });
  } catch (err) {
    next(err);
  }
};

exports.getGardens = async (req, res, next) => {
  /* ... */
};
exports.getGardenById = async (req, res, next) => {
  /* ... */
};
exports.createGarden = async (req, res, next) => {
  /* ... */
};
exports.updateGarden = async (req, res, next) => {
  /* ... */
};
exports.deleteGarden = async (req, res, next) => {
  /* ... */
};
