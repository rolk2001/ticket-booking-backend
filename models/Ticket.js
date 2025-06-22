// models/Ticket.js
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  reservation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Reservation', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  schedule_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule', required: true },
  qr_code: { type: String, required: true }, // Contient l'image du QR code en format Data URL
  seat: { type: String, default: 'Non assigné' } // On gérera la sélection de siège plus tard
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);