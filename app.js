// app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
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

// Routes Admin
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);
// ... (module.exports = app;)

module.exports = app;