// routes/schedule.js
const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

router.post('/', scheduleController.creerHoraire);
router.get('/', scheduleController.listerHoraires);

module.exports = router;