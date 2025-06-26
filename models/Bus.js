/**
 * Modèle Mongoose pour les bus.
 * Contient les informations sur chaque bus de la compagnie.
 * @typedef {Object} Bus
 * @property {String} numero - Numéro unique du bus
 * @property {Number} capacite - Capacité du bus
 * @property {String} compagnie - Compagnie du bus
 * @property {String} type_bus - Type de bus (Standard, VIP, Climatisé)
 * @property {String} status - Statut du bus (actif, inactif)
 */
// models/Bus.js
const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  numero: { type: String, required: true, unique: true },
  capacite: { type: Number, required: true },
  compagnie: { type: String, required: true },
  type_bus: { type: String, enum: ['Standard', 'VIP', 'Climatisé'], default: 'Standard' },
  status: { type: String, enum: ['actif', 'inactif'], default: 'actif' }
}, { timestamps: true });

module.exports = mongoose.model('Bus', busSchema);