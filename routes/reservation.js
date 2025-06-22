// routes/reservation.js
const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const authMiddleware = require('../middlewares/authMiddleware');

// Créer une réservation (route protégée)
router.post('/', authMiddleware, reservationController.creerReservation);

// Lister mes réservations (route protégée)
router.get('/my-reservations', authMiddleware, reservationController.mesReservations);

module.exports = router;