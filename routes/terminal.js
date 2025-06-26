/**
 * @file terminal.js
 * @brief Routes pour la gestion des terminaux de départ et d'arrivée.
 * @route POST /api/terminal Ajoute un terminal
 * @route PUT /api/terminal/:id Modifie un terminal
 * @route GET /api/terminal Liste tous les terminaux
 */
// routes/terminal.js
const express = require('express');
const router = express.Router();
const terminalController = require('../controllers/terminalController');

// Ajouter un terminal
router.post('/', terminalController.ajouterTerminal);

// Modifier un terminal
router.put('/:id', terminalController.modifierTerminal);

// Lister tous les terminaux
router.get('/', terminalController.listerTerminaux);

module.exports = router;