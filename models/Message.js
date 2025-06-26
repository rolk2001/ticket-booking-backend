const mongoose = require('mongoose');

/**
 * Modèle Mongoose pour les messages entre utilisateurs et admins.
 * @typedef {Object} Message
 * @property {Array<ObjectId>} to - Destinataires du message
 * @property {ObjectId} from - Expéditeur du message
 * @property {String} subject - Sujet du message
 * @property {String} body - Contenu du message
 * @property {Date} sentAt - Date d'envoi
 * @property {Array<ObjectId>} readBy - Utilisateurs ayant lu le message
 */

const messageSchema = new mongoose.Schema({
  to: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // destinataires
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Ajouté
  subject: { type: String, required: true },
  body: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Message', messageSchema);