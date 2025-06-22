// models/Bus.js
const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  numero: { type: String, required: true, unique: true },
  capacite: { type: Number, required: true },
  compagnie: { type: String, required: true },
  type_bus: { type: String, enum: ['Standard', 'VIP', 'Climatisé'], default: 'Standard' },
  status: { type: String, enum: ['actif', 'inactif'], default: 'actif' }
}, { timestamps: true });

module.exports = mongoose.model('Bus', busSchema);