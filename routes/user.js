const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

// Protéger la route avec le middleware d'authentification
router.get('/messages', authMiddleware, userController.getMyMessages);

router.delete('/messages/:id', authMiddleware, userController.deleteMessage);


module.exports = router; 