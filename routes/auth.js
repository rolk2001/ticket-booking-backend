// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route inscription
router.post('/register', authController.register);

// Route connexion
router.post('/login', authController.login);

module.exports = router;