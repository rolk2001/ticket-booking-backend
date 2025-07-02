/**
 * @file busController.js
 * @module controllers/busController
 * @brief Contrôleur pour la gestion des bus : ajout, modification et listing.
 * @description Permet d'ajouter, modifier et lister les bus. Toutes les fonctions sont asynchrones et renvoient des réponses JSON.
 *
 * @author UV PROJET CODE Team
 * @version 1.0
 * @date 2024-06-01
 */
// controllers/busController.js
const Bus = require('../models/Bus');

/**
 * Ajoute un nouveau bus.
 *
 * @function ajouterBus
 * @memberof module:controllers/busController
 * @param {Express.Request} req - Requête HTTP Express (body: numero, capacite, compagnie, type_bus, status).
 * @param {Express.Response} res - Réponse HTTP Express.
 * @returns {Promise<void>} Réponse JSON avec message de succès ou d'erreur.
 *
 * @throws {400} Si un champ obligatoire est manquant.
 * @throws {500} Si une erreur survient lors de l'ajout.
 *
 * @example
 * // Appel depuis une route Express
 * router.post('/bus', ajouterBus);
 *
 * @see module:models/Bus
 */
exports.ajouterBus = async (req, res) => {
  try {
    const { numero, capacite, compagnie, type_bus, status } = req.body;
    if (!numero || !capacite || !compagnie || !type_bus) {
      return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis." });
    }
    const bus = new Bus({ numero, capacite, compagnie, type_bus, status });
    await bus.save();
    res.status(201).json({ message: "Bus ajouté avec succès", bus });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Modifie un bus existant.
 *
 * @function modifierBus
 * @memberof module:controllers/busController
 * @param {Express.Request} req - Requête HTTP Express (params: id, body: champs à modifier).
 * @param {Express.Response} res - Réponse HTTP Express.
 * @returns {Promise<void>} Réponse JSON avec message de succès ou d'erreur.
 *
 * @throws {404} Si le bus n'est pas trouvé.
 * @throws {500} Si une erreur survient lors de la modification.
 *
 * @example
 * // Appel depuis une route Express
 * router.put('/bus/:id', modifierBus);
 *
 * @see module:models/Bus
 */
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

/**
 * Liste tous les bus.
 *
 * @function listerBus
 * @memberof module:controllers/busController
 * @param {Express.Request} req - Requête HTTP Express.
 * @param {Express.Response} res - Réponse HTTP Express.
 * @returns {Promise<void>} Réponse JSON contenant la liste des bus ou un message d'erreur.
 *
 * @throws {500} Si une erreur survient lors de la récupération.
 *
 * @example
 * // Appel depuis une route Express
 * router.get('/bus', listerBus);
 *
 * @see module:models/Bus
 */
exports.listerBus = async (req, res) => {
  try {
    const bus = await Bus.find();
    res.json(bus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};