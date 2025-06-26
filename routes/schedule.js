/**
 * @file schedule.js
 * @brief Routes pour la gestion des horaires de bus et la récupération des sièges réservés.
 * @route POST /api/schedule Crée un horaire
 * @route GET /api/schedule Liste les horaires
 * @route GET /api/schedule/:scheduleId/seats Récupère les sièges réservés pour un horaire
 */
// routes/schedule.js
const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');
const ticketController = require('../controllers/ticketController');

router.post('/', scheduleController.creerHoraire);
router.get('/', scheduleController.listerHoraires);
router.get('/:scheduleId/seats', ticketController.getReservedSeats);

module.exports = router;