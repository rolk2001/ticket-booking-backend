// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mot_de_passe: { type: String, required: true },
  type: { type: String, enum: ['client', 'admin'], default: 'client' },
  telephone: { type: String, required: true },
  photo: { type: String } // base64 ou URL
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);