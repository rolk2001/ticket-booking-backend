/**
 * @file schedule.js
 * @module routes/schedule
 * @brief Routes pour la gestion des horaires de bus et la récupération des sièges réservés.
 * @description Permet de créer, lister les horaires et récupérer les sièges réservés via l'API REST.
 *
 * @author UV PROJET CODE Team
 * @version 1.0
 * @date 2024-06-01
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