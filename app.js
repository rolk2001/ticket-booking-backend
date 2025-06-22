// app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Configuration CORS
const corsOptions = {
  origin: [
    'http://localhost:8100', // Pour le développement local Ionic
    'http://localhost',      // Pour les applications web locales
    'https://ticket-booking-backend-63wm.onrender.com', // Backend Render (pour les webhooks)
    // Ajoute ici l'URL de ton frontend déployé si besoin, ex:
    // 'https://ton-frontend.onrender.com'
    '*', // (optionnel, pour tout autoriser temporairement)
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Exemple de route test
app.get('/', (req, res) => {
  res.send('API Ticket Bus CM fonctionne !');
});
// ... (autres imports et middlewares)
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const busRoutes = require('./routes/bus');
app.use('/api/bus', busRoutes);

const terminalRoutes = require('./routes/terminal');
app.use('/api/terminaux', terminalRoutes);

const scheduleRoutes = require('./routes/schedule');
app.use('/api/schedules', scheduleRoutes);

const reservationRoutes = require('./routes/reservation');
app.use('/api/reservations', reservationRoutes);

const paymentRoutes = require('./routes/payment');
app.use('/api/payments', paymentRoutes);

const ticketRoutes = require('./routes/ticket');
app.use('/api/tickets', ticketRoutes);

// Routes Admin
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);
// ... (module.exports = app;)

module.exports = app;