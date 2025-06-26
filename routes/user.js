/**
 * @file user.js
 * @brief Routes utilisateur pour la gestion des messages et la communication avec l'admin.
 * @details Toutes les routes sont protégées par le middleware d'authentification.
 * @route GET /api/user/messages Liste les messages de l'utilisateur
 * @route DELETE /api/user/messages/:id Supprime un message de l'utilisateur
 * @route POST /api/user/messages/reply Répondre à l'admin
 */
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

// Protéger la route avec le middleware d'authentification
router.get('/messages', authMiddleware, userController.getMyMessages);

router.delete('/messages/:id', authMiddleware, userController.deleteMyMessage);

router.post('/messages/reply', authMiddleware, userController.replyToAdmin);

module.exports = router; 