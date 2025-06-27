/**
 * @file sendOtpMail.js
 * @module utils/sendOtpMail
 * @brief Utilitaire pour envoyer un email contenant un code OTP à l'utilisateur pour la vérification d'email.
 * @description Utilise Nodemailer pour envoyer un email avec un code OTP à l'utilisateur. Les identifiants sont récupérés depuis les variables d'environnement.
 *
 * @function sendOtpMail
 * @async
 * @param {string} email Adresse email du destinataire
 * @param {string} otp Code OTP à envoyer
 * @returns {Promise<void>} Une promesse qui se résout quand l'email est envoyé
 * @throws {Error} En cas d'échec d'envoi de l'email
 * @example
 * await sendOtpMail('user@mail.com', '123456');
 *
 * @author UV PROJET CODE Team
 * @version 1.0
 * @date 2024-06-01
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