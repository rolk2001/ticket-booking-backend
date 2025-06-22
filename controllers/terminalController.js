// controllers/terminalController.js
const Terminal = require('../models/Terminal');

// Ajouter un terminal
exports.ajouterTerminal = async (req, res) => {
  try {
    const { ville_destination, terminal_info } = req.body;
    const terminal = new Terminal({ ville_destination, terminal_info });
    await terminal.save();
    res.status(201).json({ message: "Terminal ajouté avec succès", terminal });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Modifier un terminal
exports.modifierTerminal = async (req, res) => {
  try {
    const { id } = req.params;
    const terminal = await Terminal.findByIdAndUpdate(id, req.body, { new: true });
    if (!terminal) return res.status(404).json({ message: "Terminal non trouvé" });
    res.json({ message: "Terminal modifié avec succès", terminal });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lister tous les terminaux
exports.listerTerminaux = async (req, res) => {
  try {
    const terminaux = await Terminal.find();
    res.json(terminaux);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};