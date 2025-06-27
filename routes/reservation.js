/**
 * @file reservation.js
 * @module routes/reservation
 * @brief Routes pour la création et la consultation des réservations de tickets.
 * @description Permet de créer une réservation et de consulter les réservations de l'utilisateur connecté via l'API REST.
 *
 * @author UV PROJET CODE Team
 * @version 1.0
 * @date 2024-06-01
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