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