// models/Schedule.js
const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  bus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
  terminal_depart: { type: mongoose.Schema.Types.ObjectId, ref: 'Terminal', required: true },
  terminal_arrivee: { type: mongoose.Schema.Types.ObjectId, ref: 'Terminal', required: true },
  date_depart: { type: Date, required: true },
  date_arrivee: { type: Date, required: true },
  prix: { type: Number, required: true },
  places_disponibles: { type: Number, required: true },
  status: { type: String, enum: ['programmé', 'parti', 'arrivé', 'annulé'], default: 'programmé' }
}, { timestamps: true });

module.exports = mongoose.model('Schedule', scheduleSchema);