const mongoose = require('mongoose');

/**
 * @file Message.js
 * @module models/Message
 * @brief Modèle Mongoose pour les messages entre utilisateurs et admins.
 * @typedef {Object} Message
 * @property {Array<ObjectId>} to Destinataires du message
 * @property {ObjectId} from Expéditeur du message
 * @property {String} subject Sujet du message
 * @property {String} body Contenu du message
 * @property {Date} sentAt Date d'envoi
 * @property {Array<ObjectId>} readBy Utilisateurs ayant lu le message
 * @property {Date} createdAt Date de création (auto-gérée par Mongoose)
 * @property {Date} updatedAt Date de dernière modification (auto-gérée par Mongoose)
 * @example
 * const msg = new Message({ to: [userId], from: adminId, subject: 'Info', body: 'Bienvenue !' });
 *
 * @author UV PROJET CODE Team
 * @version 1.0
 * @date 2024-06-01
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