/**
 * @file Bus.js
 * @module models/Bus
 * @brief Modèle Mongoose pour les bus.
 * @typedef {Object} Bus
 * @property {String} numero Numéro unique du bus
 * @property {Number} capacite Capacité du bus
 * @property {String} compagnie Compagnie du bus
 * @property {String} type_bus Type de bus (Standard, VIP, Climatisé)
 * @property {String} status Statut du bus (actif, inactif)
 * @property {Date} createdAt Date de création (auto-gérée par Mongoose)
 * @property {Date} updatedAt Date de dernière modification (auto-gérée par Mongoose)
 * @example
 * const bus = new Bus({ numero: 'BUS001', capacite: 50, compagnie: 'Express', type_bus: 'VIP' });
 *
 * @author UV PROJET CODE Team
 * @version 1.0
 * @date 2024-06-01
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