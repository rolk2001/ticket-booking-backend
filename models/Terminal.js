/**
 * @file Terminal.js
 * @module models/Terminal
 * @brief Modèle Mongoose pour les terminaux de départ/arrivée.
 * @typedef {Object} Terminal
 * @property {String} nom Nom du terminal
 * @property {String} ville Ville du terminal
 * @property {String} adresse Adresse du terminal
 * @property {Date} createdAt Date de création (auto-gérée par Mongoose)
 * @property {Date} updatedAt Date de dernière modification (auto-gérée par Mongoose)
 * @example
 * const terminal = new Terminal({ nom: 'Gare Yaoundé', ville: 'Yaoundé', adresse: 'Centre-ville' });
 *
 * @author UV PROJET CODE Team
 * @version 1.0
 * @date 2024-06-01
 */
// models/Terminal.js
const mongoose = require('mongoose');

const terminalSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  ville: { type: String, required: true },
  adresse: { type: String, required: true },
  // Le prix sera géré au niveau des horaires (Schedule) car il dépend du trajet,
  // pas seulement du terminal. On le retire d'ici pour plus de flexibilité.
}, { timestamps: true });

module.exports = mongoose.model('Terminal', terminalSchema);