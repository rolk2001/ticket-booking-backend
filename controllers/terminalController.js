/**
 * Contrôleur pour la gestion des terminaux : ajout, modification et listing.
 */
// controllers/terminalController.js
const Terminal = require('../models/Terminal');

/**
 * Ajoute un nouveau terminal.
 * @route POST /api/terminaux
 * @param {string} ville_destination - Ville de destination
 * @param {string} terminal_info - Informations sur le terminal
 * @returns {Object} Message de succès ou d'erreur
 */
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

/**
 * Modifie un terminal existant.
 * @route PUT /api/terminaux/:id
 * @param {string} id - Identifiant du terminal à modifier
 * @returns {Object} Message de succès ou d'erreur
 */
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

/**
 * Liste tous les terminaux.
 * @route GET /api/terminaux
 * @returns {Array} Liste des terminaux
 */
exports.listerTerminaux = async (req, res) => {
  try {
    const terminaux = await Terminal.find();
    res.json(terminaux);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};