/**
 * @file Schedule.js
 * @module models/Schedule
 * @brief Modèle Mongoose pour les horaires de bus.
 * @typedef {Object} Schedule
 * @property {ObjectId} bus Référence vers le bus
 * @property {ObjectId} terminal_depart Terminal de départ
 * @property {ObjectId} terminal_arrivee Terminal d'arrivée
 * @property {Date} date_depart Date et heure de départ
 * @property {Date} date_arrivee Date et heure d'arrivée
 * @property {Number} prix Prix du trajet
 * @property {Number} places_disponibles Nombre de places restantes
 * @property {String} status Statut de l'horaire (programmé, parti, arrivé, annulé)
 * @property {Array} seat_map Carte des sièges
 * @property {Date} createdAt Date de création (auto-gérée par Mongoose)
 * @property {Date} updatedAt Date de dernière modification (auto-gérée par Mongoose)
 * @example
 * const schedule = new Schedule({ bus, terminal_depart, terminal_arrivee, date_depart: new Date(), prix: 5000 });
 *
 * @author UV PROJET CODE Team
 * @version 1.0
 * @date 2024-06-01
 */
// models/Schedule.js
const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  bus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
  terminal_depart: { type: mongoose.Schema.Types.ObjectId, ref: 'Terminal', required: true },
  terminal_arrivee: { type: mongoose.Schema.Types.ObjectId, ref: 'Terminal', required: true },
  date_depart: { type: Date, required: true },
  date_arrivee: { type: Date, required: true },
  prix: { type: Number, required: true },
  places_disponibles: { type: Number, required: true },
  status: { type: String, enum: ['programmé', 'parti', 'arrivé', 'annulé'], default: 'programmé' },
  seat_map: [{ number: String }] 
}, { timestamps: true });

module.exports = mongoose.model('Schedule', scheduleSchema);