/**
 * Modèle Mongoose pour les paiements liés aux réservations.
 * @typedef {Object} Payment
 * @property {ObjectId} reservation_id - Référence vers la réservation
 * @property {Number} montant - Montant payé
 * @property {String} moyen - Moyen de paiement (Mobile Money, NotchPay, Test)
 * @property {String} status - Statut du paiement (en attente, succès, échec)
 * @property {String} transaction_id - Identifiant de la transaction
 */
// models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  reservation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Reservation', required: true },
  montant: { type: Number, required: true },
  moyen: { type: String, enum: ['Mobile Money', 'NotchPay', 'Test'], default: 'Test' },
  status: { type: String, enum: ['en attente', 'succès', 'échec'], default: 'en attente' },
  transaction_id: { type: String } // Fourni par le service de paiement
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);