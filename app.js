// app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Configuration CORS propre
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
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

const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

// ... (module.exports = app;)

module.exports = app;