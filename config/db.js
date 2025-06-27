/**
 * @file db.js
 * @module config/db
 * @brief Configuration de la connexion à la base de données MongoDB avec Mongoose.
 * @description Initialise la connexion à la base de données MongoDB à partir de l'URI stockée dans la variable d'environnement MONGODB_URI. Arrête le serveur en cas d'échec de connexion.
 *
 * @function connectDB
 * @async
 * @returns {Promise<void>} Une promesse qui se résout si la connexion est réussie
 * @throws {Error} En cas d'échec de connexion
 * @see https://mongoosejs.com/docs/
 *
 * @author UV PROJET CODE Team
 * @version 1.0
 * @date 2024-06-01
 */
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