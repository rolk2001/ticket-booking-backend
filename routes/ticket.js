/**
 * @file ticket.js
 * @brief Routes pour la gestion et la récupération des tickets de réservation.
 * @route GET /api/ticket/:reservationId Récupère un ticket par l'ID de la réservation (protégée)
 */
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const authMiddleware = require('../middlewares/authMiddleware');

// Récupérer un ticket par l'ID de la réservation
router.get('/:reservationId', authMiddleware, ticketController.getTicketByReservationId);

module.exports = router; 