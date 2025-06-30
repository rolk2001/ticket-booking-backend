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
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Serveur prêt et à l'écoute sur le port ${PORT}`);
  });
});