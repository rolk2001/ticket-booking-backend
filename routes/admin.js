const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Appliquer le middleware admin à toutes les routes
router.use(adminMiddleware);

// Dashboard
router.get('/dashboard', adminController.getDashboardStats);

// Gestion des bus
router.get('/buses', adminController.getAllBuses);
router.post('/buses', adminController.createBus);
router.put('/buses/:id', adminController.updateBus);
router.delete('/buses/:id', adminController.deleteBus);

// Gestion des terminaux
router.get('/terminals', adminController.getAllTerminals);
router.post('/terminals', adminController.createTerminal);
router.put('/terminals/:id', adminController.updateTerminal);
router.delete('/terminals/:id', adminController.deleteTerminal);

// Gestion des horaires
router.get('/schedules', adminController.getAllSchedules);
router.post('/schedules', adminController.createSchedule);
router.put('/schedules/:id', adminController.updateSchedule);
router.delete('/schedules/:id', adminController.deleteSchedule);

// Gestion des réservations
router.get('/reservations', adminController.getAllReservations);
router.put('/reservations/:id/status', adminController.updateReservationStatus);

// Gestion des paiements
router.get('/payments', adminController.getAllPayments);

// Gestion des tickets
router.get('/tickets', adminController.getAllTickets);

// Gestion des utilisateurs
router.get('/users', adminController.getAllUsers);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

module.exports = router;