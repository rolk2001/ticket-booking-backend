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
});