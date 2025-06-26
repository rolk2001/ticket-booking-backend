/**
 * Routes utilisateur pour la gestion des messages et la communication avec l'admin.
 * Toutes les routes sont protégées par le middleware d'authentification.
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