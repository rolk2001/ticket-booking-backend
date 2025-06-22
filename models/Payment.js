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