// routes/payment.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route pour initier le paiement depuis le frontend (protégée)
router.post('/initiate-payment', authMiddleware, paymentController.initiatePayment);

// Nouvelle route pour le webhook de Notch Pay (sans authentification, car appelée par un serveur externe)
router.post('/notchpay-webhook', paymentController.handleNotchPayWebhook);

module.exports = router;