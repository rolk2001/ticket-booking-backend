/**
 * @file sendOtpMail.js
 * @module utils/sendOtpMail
 * @brief Utilitaire pour envoyer un email contenant un code OTP à l'utilisateur pour la vérification d'email.
 * @description Utilise Nodemailer pour envoyer un email avec un code OTP à l'utilisateur. Les identifiants sont récupérés depuis les variables d'environnement.
 *
 * @module utils/sendOtpMail
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

/**
 * Envoie un email générique (OTP ou message personnalisé)
 * @param {string} email Destinataire
 * @param {string} subject Sujet de l'email
 * @param {string} htmlContent Contenu HTML du message
 */
/**
 * Envoie un email générique (OTP ou message personnalisé)
 * @module utils/sendOtpMail
 * @function
 * @param {string} email Destinataire
 * @param {string} subject Sujet de l'email
 * @param {string} htmlContent Contenu HTML du message
 * @returns {Promise<void>} Une promesse qui se résout quand l'email est envoyé
 * @throws {Error} En cas d'échec d'envoi de l'email
 * @example
 * await sendMail('user@mail.com', 'Sujet', '<b>Votre code : 123456</b>');
 */
module.exports = async function sendMail(email, subject, htmlContent) {
  await transporter.sendMail({
    from: `"Ticket Bus CM" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: subject,
    html: htmlContent
  });
};