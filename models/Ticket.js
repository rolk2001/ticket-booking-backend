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