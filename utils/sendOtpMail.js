/**
 * Envoie un email contenant un code OTP à l'utilisateur pour la vérification d'email.
 * Utilise Nodemailer et les variables d'environnement pour l'authentification Gmail.
 * @async
 * @function sendOtpMail
 * @param {string} email - Adresse email du destinataire
 * @param {string} otp - Code OTP à envoyer
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