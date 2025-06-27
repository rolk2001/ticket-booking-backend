/**
 * @file createAdmin.js
 * @brief Script utilitaire pour créer un utilisateur administrateur par défaut dans la base de données.
 * @description À lancer manuellement pour initialiser un compte admin. Utilise Mongoose pour la connexion et Bcrypt pour le hash du mot de passe.
 * @see models/User.js pour le modèle utilisateur
 *
 * @function createAdminUser
 * @async
 * @returns {Promise<void>} Une promesse qui se résout quand l'utilisateur admin est créé
 * @throws {Error} En cas d'échec de connexion ou de création
 * @example
 * // Depuis la ligne de commande :
 * node createAdmin.js
 *
 * @author UV PROJET CODE Team
 * @version 1.0
 * @date 2024-06-01
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const createAdminUser = async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connecté à MongoDB');

    // Vérifier si l'admin existe déjà
    const existingAdmin = await User.findOne({ email: 'admin@ticketbuscm.com' });
    
    if (existingAdmin) {
      console.log('L\'utilisateur admin existe déjà');
      return;
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Créer l'utilisateur admin
    const adminUser = new User({
      nom: 'Administrateur',
      email: 'admin@ticketbuscm.com',
      mot_de_passe: hashedPassword,
      type: 'admin',
      telephone: '+237 123456789'
    });

    await adminUser.save();
    console.log('Utilisateur admin créé avec succès !');
    console.log('Email: admin@ticketbuscm.com');
    console.log('Mot de passe: admin123');

  } catch (error) {
    console.error('Erreur lors de la création de l\'admin:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Déconnecté de MongoDB');
  }
};

createAdminUser(); 