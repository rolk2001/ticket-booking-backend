/**
 * @file sendOtpMail.js
 * @brief Utilitaire pour envoyer un email contenant un code OTP à l'utilisateur pour la vérification d'email.
 * @function sendOtpMail
 * @async
 * @param {string} email Adresse email du destinataire
 * @param {string} otp Code OTP à envoyer
 * @returns {Promise<void>} Une promesse qui se résout quand l'email est envoyé
 * @example
 * await sendOtpMail('user@mail.com', '123456');
 */
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS  
  }
});

module.exports = async function sendOtpMail(email, otp) {
  await transporter.sendMail({
    from: `"Ticket Bus CM" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Votre code de vérification",
    html: `<p>Votre code de vérification est : <b>${otp}</b></p>`
  });
};