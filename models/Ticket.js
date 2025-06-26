/**
 * Modèle Mongoose pour les tickets générés après réservation et paiement.
 * @typedef {Object} Ticket
 * @property {ObjectId} reservation_id - Référence vers la réservation
 * @property {ObjectId} user_id - Référence vers l'utilisateur
 * @property {ObjectId} schedule - Référence vers l'horaire
 * @property {String} qr_code - Données du QR code
 * @property {String} seat - Siège assigné
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