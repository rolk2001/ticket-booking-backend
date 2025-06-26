/**
 * @file reservation.js
 * @brief Routes pour la création et la consultation des réservations de tickets.
 * @route POST /api/reservation Crée une réservation (protégée)
 * @route GET /api/reservation/my-reservations Liste les réservations de l'utilisateur connecté (protégée)
 */
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