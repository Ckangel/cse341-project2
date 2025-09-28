const Garden = require("../models/Garden");

// GET all gardens
exports.getAllGardens = async (req, res) => {
  try {
    const gardens = await Garden.find();
    res.status(200).json(gardens);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single garden
exports.getGardenById = async (req, res) => {
  try {
    const garden = await Garden.findById(req.params.id);
    if (!garden) return res.status(404).json({ error: "Garden not found" });
    res.status(200).json(garden);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create new garden
exports.createGarden = async (req, res) => {
  try {
    const garden = new Garden(req.body);
    await garden.save();
    res.status(201).json(garden);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT update garden
exports.updateGarden = async (req, res) => {
  try {
    const garden = await Garden.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!garden) return res.status(404).json({ error: "Garden not found" });
    res.status(200).json(garden);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE garden
exports.deleteGarden = async (req, res) => {
  try {
    const garden = await Garden.findByIdAndDelete(req.params.id);
    if (!garden) return res.status(404).json({ error: "Garden not found" });
    res.status(200).json({ message: "Garden deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
