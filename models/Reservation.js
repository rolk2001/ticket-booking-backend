// models/Reservation.js
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  schedule: { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule', required: true },
  nombre_places: { type: Number, required: true, min: 1 },
  statut: { 
    type: String, 
    enum: ['en_attente', 'confirmée', 'annulée', 'terminée'], 
    default: 'en_attente' // On passe à 'confirmée' après le paiement
  },
  // Les autres infos (user_name, user_email, depart_date) peuvent être récupérées
  // via les références (populate), on évite la redondance.
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);