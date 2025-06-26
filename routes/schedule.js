/**
 * Routes pour la gestion des horaires de bus et la récupération des sièges réservés.
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