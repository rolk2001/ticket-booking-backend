// controllers/busController.js
const Bus = require('../models/Bus');

// Ajouter un bus
exports.ajouterBus = async (req, res) => {
  try {
    const { matricule, capacite, status, nomAgence } = req.body;
    const bus = new Bus({ matricule, capacite, status, nomAgence });
    await bus.save();
    res.status(201).json({ message: "Bus ajouté avec succès", bus });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Modifier un bus
exports.modifierBus = async (req, res) => {
  try {
    const { id } = req.params;
    const bus = await Bus.findByIdAndUpdate(id, req.body, { new: true });
    if (!bus) return res.status(404).json({ message: "Bus non trouvé" });
    res.json({ message: "Bus modifié avec succès", bus });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lister tous les bus
exports.listerBus = async (req, res) => {
  try {
    const bus = await Bus.find();
    res.json(bus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};