/**
 * @file Ticket.js
 * @module models/Ticket
 * @brief Modèle Mongoose pour les tickets générés après réservation et paiement.
 * @typedef {Object} Ticket
 * @property {ObjectId} reservation_id Référence vers la réservation
 * @property {ObjectId} user_id Référence vers l'utilisateur
 * @property {ObjectId} schedule Référence vers l'horaire
 * @property {String} qr_code Données du QR code
 * @property {String} seat Siège assigné
 * @property {Date} createdAt Date de création (auto-gérée par Mongoose)
 * @property {Date} updatedAt Date de dernière modification (auto-gérée par Mongoose)
 * @example
 * const ticket = new Ticket({ reservation_id, user_id, schedule, seat: 'A1' });
 *
 * @author UV PROJET CODE Team
 * @version 1.0
 * @date 2024-06-01
 */
// models/Ticket.js
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  reservation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Reservation', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  schedule: { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule', required: true }, // <-- corrige ici
  qr_code: { type: String }, // Peut être optionnel si pas toujours généré à la création
  seat: { type: String, default: 'Non assigné' }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);