/**
 * @file payment.js
 * @module routes/payment
 * @brief Routes pour l'initiation des paiements et la gestion des webhooks de paiement.
 * @description Permet d'initier un paiement et de gérer les webhooks NotchPay via l'API REST.
 *
 * @author UV PROJET CODE Team
 * @version 1.0
 * @date 2024-06-01
 * @route POST /api/payment/initiate-payment Initie un paiement (protégée)
 * @route POST /api/payment/notchpay-webhook Webhook NotchPay (non protégée)
 */
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