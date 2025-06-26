/**
 * Routes pour la gestion des bus (ajout, modification, listing).
 */
// routes/bus.js
const express = require('express');
const router = express.Router();
const busController = require('../controllers/busController');

// Ajouter un bus
router.post('/', busController.ajouterBus);

// Modifier un bus
router.put('/:id', busController.modifierBus);

// Lister tous les bus
router.get('/', busController.listerBus);

module.exports = router;