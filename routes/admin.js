/**
 * @file admin.js
 * @brief Routes d'administration pour la gestion centralisée des bus, terminaux, horaires, réservations, paiements, tickets, utilisateurs et messages.
 * @details Toutes les routes sont protégées par le middleware admin.
 * @route GET /api/admin/dashboard Statistiques du dashboard
 * @route GET/POST/PUT/DELETE /api/admin/buses Gestion des bus
 * @route GET/POST/PUT/DELETE /api/admin/terminals Gestion des terminaux
 * @route GET/POST/PUT/DELETE /api/admin/schedules Gestion des horaires
 * @route GET/PUT /api/admin/reservations Gestion des réservations
 * @route GET /api/admin/payments Gestion des paiements
 * @route GET /api/admin/tickets Gestion des tickets
 * @route GET/PUT/DELETE /api/admin/users Gestion des utilisateurs
 * @route POST/GET/PUT /api/admin/messages Gestion des messages
 * @route GET /api/admin/messages/inbox Boîte de réception admin
 */
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminMiddleware = require('../middlewares/adminMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

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

// Gestion des messages
router.post('/messages', adminController.sendMessage); // Envoi d'un message
router.get('/messages', adminController.getAllMessages); // Liste pour admin
router.get('/messages/user/:userId', adminController.getUserMessages); // Liste pour un utilisateur
router.put('/messages/:id/read', adminController.markAsRead); // Marquer comme lu
router.get('/messages/inbox', authMiddleware, adminMiddleware, adminController.getInbox);

module.exports = router;