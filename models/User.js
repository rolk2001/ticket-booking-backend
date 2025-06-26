/**
 * Modèle Mongoose pour les utilisateurs (clients et admins).
 * @typedef {Object} User
 * @property {String} nom - Nom de l'utilisateur
 * @property {String} email - Email unique
 * @property {String} mot_de_passe - Mot de passe hashé
 * @property {String} type - Type d'utilisateur (client, admin)
 * @property {String} telephone - Numéro de téléphone
 * @property {String} photo - Photo de profil (optionnelle)
 */
// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mot_de_passe: { type: String, required: true },
  type: { type: String, enum: ['client', 'admin'], default: 'client' },
  telephone: { type: String, required: true },
  photo: { type: String } // base64 ou URL
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);