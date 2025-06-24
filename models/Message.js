const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  to: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // destinataires
  subject: { type: String, required: true },
  body: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Message', messageSchema);