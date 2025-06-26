/**
 * @file auth.js
 * @brief Routes d'authentification : connexion, inscription, OTP, modification de profil.
 * @route POST /api/auth/login Connexion utilisateur
 * @route PUT /api/auth/profile Modification du profil utilisateur (protégée)
 * @route POST /api/auth/request-signup-otp Demande d'OTP pour inscription
 * @route POST /api/auth/verify-otp-register Vérification OTP et inscription
 */
// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route inscription
//router.post('/register', authController.register);

// Route connexion
router.post('/login', authController.login);

// Route modification du profil utilisateur connecté
router.put('/profile', authMiddleware, authController.updateProfile);
router.post('/request-signup-otp', authController.requestSignupOtp);
router.post('/verify-otp-register', authController.verifyOtpAndRegister);

module.exports = router;