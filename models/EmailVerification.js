const mongoose = require('mongoose');

/**
 * @file EmailVerification.js
 * @brief Modèle Mongoose pour la vérification d'email par OTP.
 * @typedef {Object} EmailVerification
 * @property {String} email Email à vérifier
 * @property {String} otp Code OTP envoyé
 * @property {Date} expiresAt Date d'expiration de l'OTP
 * @example
 * const verif = new EmailVerification({ email: 'test@mail.com', otp: '123456', expiresAt: new Date() });
 */

const emailVerificationSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true }
});

module.exports = mongoose.model('EmailVerification', emailVerificationSchema);