/**
 * @file terminalController.js
 * @module controllers/terminalController
 * @brief Contrôleur pour la gestion des terminaux : ajout, modification et listing.
 * @description Permet d'ajouter, modifier et lister les terminaux. Toutes les fonctions sont asynchrones et renvoient des réponses JSON.
 *
 * @author UV PROJET CODE Team
 * @version 1.0
 * @date 2024-06-01
 */
// controllers/terminalController.js
const Terminal = require('../models/Terminal');

/**
 * Ajoute un nouveau terminal.
 *
 * @function ajouterTerminal
 * @memberof module:controllers/terminalController
 * @param {Express.Request} req - Requête HTTP Express (body: ville_destination, terminal_info).
 * @param {Express.Response} res - Réponse HTTP Express.
 * @returns {Promise<void>} Réponse JSON avec message de succès ou d'erreur.
 *
 * @throws {500} Si une erreur survient lors de l'ajout.
 *
 * @example
 * // Appel depuis une route Express
 * router.post('/terminaux', ajouterTerminal);
 *
 * @see module:models/Terminal
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
 *
 * @function modifierTerminal
 * @memberof module:controllers/terminalController
 * @param {Express.Request} req - Requête HTTP Express (params: id, body: champs à modifier).
 * @param {Express.Response} res - Réponse HTTP Express.
 * @returns {Promise<void>} Réponse JSON avec message de succès ou d'erreur.
 *
 * @throws {404} Si le terminal n'est pas trouvé.
 * @throws {500} Si une erreur survient lors de la modification.
 *
 * @example
 * // Appel depuis une route Express
 * router.put('/terminaux/:id', modifierTerminal);
 *
 * @see module:models/Terminal
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
 *
 * @function listerTerminaux
 * @memberof module:controllers/terminalController
 * @param {Express.Request} req - Requête HTTP Express.
 * @param {Express.Response} res - Réponse HTTP Express.
 * @returns {Promise<void>} Réponse JSON contenant la liste des terminaux ou un message d'erreur.
 *
 * @throws {500} Si une erreur survient lors de la récupération.
 *
 * @example
 * // Appel depuis une route Express
 * router.get('/terminaux', listerTerminaux);
 *
 * @see module:models/Terminal
 */
exports.listerTerminaux = async (req, res) => {
  try {
    const terminaux = await Terminal.find();
    res.json(terminaux);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};