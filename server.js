/**
 * @file server.js
 * @module server
 * @brief Point d'entrée du serveur Node.js pour Ticket Bus CM.
 * @description Initialise la connexion à la base de données MongoDB et démarre l'application Express sur le port défini dans les variables d'environnement.
 * @see app.js pour la configuration de l'application
 * @see config/db.js pour la connexion à la base de données
 *
 * @author UV PROJET CODE Team
 * @version 1.0
 * @date 2024-06-01
 */
// server.js
const app = require('./app');
const connectDB = require('./config/db');
const Schedule = require('./models/Schedule');
const cron = require('node-cron');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Connexion à la base de données puis démarrage du serveur
const Reservation = require('./models/Reservation');

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Serveur prêt et à l'écoute sur le port ${PORT}`);
  });

  // Cron : suppression des réservations en attente de +30min et libération des places
  const Ticket = require('./models/Ticket');
  cron.schedule('*/5 * * * *', async () => {
    try {
      const now = new Date();
      const threshold = new Date(now.getTime() - 30 * 60 * 1000); // 30 minutes avant maintenant
      const expiredReservations = await Reservation.find({
        statut: 'en_attente',
        createdAt: { $lte: threshold }
      });
      for (const reservation of expiredReservations) {
        // Libérer les places dans le schedule
        await Schedule.findByIdAndUpdate(
          reservation.schedule,
          { $inc: { places_disponibles: reservation.nombre_places } }
        );
        // Supprimer les tickets associés à la réservation
        await Ticket.deleteMany({ reservation_id: reservation._id });
        // Supprimer la réservation
        await Reservation.findByIdAndDelete(reservation._id);
        console.log(`[CRON] Réservation ${reservation._id} supprimée (non payée sous 30min)`);
      }
      if (expiredReservations.length > 0) {
        console.log(`[CRON] Total réservations supprimées : ${expiredReservations.length}`);
      }
    } catch (err) {
      console.error('[CRON] Erreur suppression réservations expirées :', err.message);
    }
  });

  // === CRON : Notification 30min avant départ ===
  const Payment = require('./models/Payment');
  const Message = require('./models/Message');
  const User = require('./models/User');
  const sendMail = require('./utils/sendOtpMail');
  cron.schedule('*/5 * * * *', async () => {
    try {
      const now = new Date();
      // Fenêtre de 5 minutes autour de 30min avant départ
      const minDate = new Date(now.getTime() + 30 * 60 * 1000 - 2.5 * 60 * 1000); // 27.5min
      const maxDate = new Date(now.getTime() + 30 * 60 * 1000 + 2.5 * 60 * 1000); // 32.5min

      // On ne traite que les paiements "succès" et pas encore notifiés
      const payments = await Payment.find({ status: 'succès', reminderSent: false }).populate({
        path: 'reservation_id',
        populate: { path: 'schedule user' }
      });

      for (const payment of payments) {
        const reservation = payment.reservation_id;
        if (!reservation || !reservation.schedule || !reservation.user) continue;
        const schedule = reservation.schedule;
        const user = reservation.user;
        // On suppose que le champ de date de départ est "heure_depart" ou "date_depart"
        const departDate = schedule.heure_depart || schedule.date_depart;
        if (!departDate) continue;
        // Conversion explicite en heure du Cameroun (Africa/Douala)
        const departTime = new Date(departDate);
        // Pour la comparaison, il faut que minDate et maxDate soient aussi "Cameroun" si besoin, mais ici on garde la logique existante
        if (departTime >= minDate && departTime <= maxDate) {
          // Message interne
          const subject = "Préparez-vous pour votre voyage !";
          // Affichage heure du Cameroun
          const heureCameroun = departTime.toLocaleString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: 'Africa/Douala'
          });
          const bodyText = `Bonjour ${user.nom || ''},\n\nVotre bus partira à ${heureCameroun}. Merci de vous préparer à l'avance et d'arriver au terminal à l'heure car le départ est dans 30 minutes.\n\nBon voyage !\nL'équipe Ticket Bus CM`;
          const bodyHtml = bodyText.replace(/\n/g, '<br>');
          const message = new Message({
            to: [user._id],
            from: null,
            subject,
            body: bodyText
          });
          await message.save();
          // Email
          await sendMail(user.email, subject, bodyHtml);
          // Marquer comme notifié
          payment.reminderSent = true;
          await payment.save();
          console.log(`[CRON] Notification "30min avant départ" envoyée à ${user.email} pour réservation ${reservation._id}`);
        }
      }
    } catch (err) {
      console.error('[CRON] Erreur notification 30min avant départ :', err.message);
    }
  });
});