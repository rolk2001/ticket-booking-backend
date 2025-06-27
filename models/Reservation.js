/**
 * @file Reservation.js
 * @module models/Reservation
 * @brief Modèle Mongoose pour les réservations de tickets.
 * @typedef {Object} Reservation
 * @property {ObjectId} user Référence vers l'utilisateur
 * @property {ObjectId} schedule Référence vers l'horaire
 * @property {Number} nombre_places Nombre de places réservées
 * @property {String} statut Statut de la réservation (en_attente, confirmée, annulée, terminée)
 * @property {Date} createdAt Date de création (auto-gérée par Mongoose)
 * @property {Date} updatedAt Date de dernière modification (auto-gérée par Mongoose)
 * @example
 * const reservation = new Reservation({ user, schedule, nombre_places: 2 });
 *
 * @author UV PROJET CODE Team
 * @version 1.0
 * @date 2024-06-01
 */
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