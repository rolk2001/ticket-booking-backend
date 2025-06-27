/**
 * @file user.js
 * @module routes/user
 * @brief Routes utilisateur pour la gestion des messages et la communication avec l'admin.
 * @description Permet à l'utilisateur de consulter, supprimer et répondre à des messages via l'API REST. Toutes les routes sont protégées par le middleware d'authentification.
 *
 * @author UV PROJET CODE Team
 * @version 1.0
 * @date 2024-06-01
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