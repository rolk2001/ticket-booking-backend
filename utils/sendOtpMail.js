const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // ton adresse Gmail
    pass: process.env.GMAIL_PASS  // mot de passe d’application Gmail
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