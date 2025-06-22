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