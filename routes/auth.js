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