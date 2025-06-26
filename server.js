/**
 * @file server.js
 * @brief Point d'entrée du serveur Node.js pour Ticket Bus CM.
 * @module server
 * @details Initialise la connexion à la base de données et démarre l'application Express sur le port défini.
 * @see app.js pour la configuration de l'application
 * @see config/db.js pour la connexion à la base de données
 */
// server.js
const app = require('./app');
const connectDB = require('./config/db');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Connexion à la base de données puis démarrage du serveur
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Serveur prêt et à l'écoute sur le port ${PORT}`);
  });
});