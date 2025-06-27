/**
 * @file bus.js
 * @module routes/bus
 * @brief Routes pour la gestion des bus (ajout, modification, listing).
 * @description Permet d'ajouter, modifier et lister les bus via l'API REST.
 *
 * @author UV PROJET CODE Team
 * @version 1.0
 * @date 2024-06-01
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