const mongoose = require('mongoose');

/**
 * Modèle Mongoose pour la vérification d'email par OTP.
 * @typedef {Object} EmailVerification
 * @property {String} email - Email à vérifier
 * @property {String} otp - Code OTP envoyé
 * @property {Date} expiresAt - Date d'expiration de l'OTP
 */

const emailVerificationSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true }
});

module.exports = mongoose.model('EmailVerification', emailVerificationSchema);