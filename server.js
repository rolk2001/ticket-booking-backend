/**
 * Point d'entrée du serveur Node.js.
 * Initialise la connexion à la base de données et démarre l'application Express sur le port défini.
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