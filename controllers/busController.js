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
 * @brief Ajoute un nouveau bus.
 * @route POST /api/bus
 * @param {string} numero - Numéro du bus
 * @param {number} capacite - Capacité du bus
 * @param {string} compagnie - Compagnie du bus
 * @param {string} type_bus - Type de bus
 * @param {string} status - Statut du bus (optionnel)
 * @returns {Object} Message de succès ou d'erreur
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
 * @brief Modifie un bus existant.
 * @route PUT /api/bus/:id
 * @param {string} id - Identifiant du bus à modifier
 * @returns {Object} Message de succès ou d'erreur
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
 * @brief Liste tous les bus.
 * @route GET /api/bus
 * @returns {Array} Liste des bus
 */
exports.listerBus = async (req, res) => {
  try {
    const bus = await Bus.find();
    res.json(bus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};