// config/db.js
const mongoose = require('mongoose');

/**
 * Initialise la connexion à la base de données MongoDB avec Mongoose.
 * Utilise l'URI stockée dans la variable d'environnement MONGODB_URI.
 * Arrête le serveur en cas d'échec de connexion.
 * @async
 * @function connectDB
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connecté avec succès');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error.message);
    process.exit(1); // Arrête le serveur si la connexion échoue
  }
};

module.exports = connectDB;