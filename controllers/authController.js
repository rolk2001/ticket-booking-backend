// controllers/authController.js
const User = require('../models/User');
const EmailVerification = require('../models/EmailVerification');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendOtpMail = require('../utils/sendOtpMail');

exports.register = async (req, res) => {
  try {
    const { nom, email, mot_de_passe, telephone, type } = req.body;
    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email déjà utilisé" });

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    // Créer l'utilisateur
    const user = new User({
      nom,
      email,
      mot_de_passe: hashedPassword,
      telephone,
      type
    });
    await user.save();

    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  console.log('--- Tentative de connexion ---');
  console.log('Body reçu:', req.body);
  try {
    const { email, mot_de_passe } = req.body;
    
    if (!email || !mot_de_passe) {
      console.log('Validation échouée: email ou mot de passe manquant.');
      return res.status(400).json({ message: 'Email et mot de passe sont requis.' });
    }

    console.log(`Recherche de l'utilisateur avec l'email: ${email}`);
    const user = await User.findOne({ email });

    if (!user) {
      console.log(`Utilisateur non trouvé pour l'email: ${email}`);
      return res.status(400).json({ message: "Email ou mot de passe incorrect" });
    }
    console.log(`Utilisateur trouvé: ${user.nom}`);

    console.log('Comparaison des mots de passe...');
    const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);

    if (!isMatch) {
      console.log('Le mot de passe ne correspond pas.');
      return res.status(400).json({ message: "Email ou mot de passe incorrect" });
    }
    console.log('Le mot de passe correspond. Connexion réussie.');

    // Générer le token JWT
    const token = jwt.sign(
      { userId: user._id, type: user.type },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ 
      token, 
      user: { 
        id: user._id, 
        nom: user.nom, 
        email: user.email, 
        type: user.type, 
        telephone: user.telephone,
        photo: user.photo 
      } 
    });
  } catch (error) {
    console.error('Erreur inattendue dans la fonction login:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { nom, email, telephone, photo } = req.body;
    const updateData = {};
    if (nom) updateData.nom = nom;
    if (email) updateData.email = email;
    if (telephone) updateData.telephone = telephone;
    if (photo) updateData.photo = photo;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-mot_de_passe');
    if (!updatedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du profil', error: error.message });
  }
};

exports.requestSignupOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  await EmailVerification.findOneAndUpdate(
    { email },
    { otp, expiresAt },
    { upsert: true, new: true }
  );

  await sendOtpMail(email, otp);

  res.json({ message: "Code envoyé à votre e-mail." });
};

exports.verifyOtpAndRegister = async (req, res) => {
  const { email, otp, nom, mot_de_passe, telephone } = req.body;
  const record = await EmailVerification.findOne({ email });

  if (!record || record.otp !== otp || record.expiresAt < new Date()) {
    return res.status(400).json({ message: "Code invalide ou expiré." });
  }

  // Vérifie si l'utilisateur existe déjà
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "Email déjà utilisé" });

  // Crée l'utilisateur
  const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
  const user = new User({ email, nom, mot_de_passe: hashedPassword, telephone });
  await user.save();

  // Supprime l'OTP utilisé
  await EmailVerification.deleteOne({ email });

  res.json({ message: "Inscription réussie !" });
};