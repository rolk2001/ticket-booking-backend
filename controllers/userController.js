const Message = require('../models/Message');
const User = require('../models/User');

/**
 * @file userController.js
 * @module controllers/userController
 * @brief Contrôleur utilisateur pour la gestion des messages et des interactions avec l'admin.
 * @description Permet de récupérer, supprimer et répondre aux messages. Toutes les fonctions sont asynchrones et renvoient des réponses JSON.
 *
 * @author UV PROJET CODE Team
 * @version 1.0
 * @date 2024-06-01
 */

// Récupérer les messages de l'utilisateur connecté
/**
 * Récupère les messages de l'utilisateur connecté.
 * @route GET /api/user/messages
 * @returns {Array} Liste des messages reçus par l'utilisateur
 */
exports.getMyMessages = async (req, res) => {
  try {
    const userId = req.user.userId; // récupéré grâce au middleware d'auth
    const messages = await Message.find({ to: userId }).sort({ sentAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des messages." });
  }
};

// Suppression personnelle d'un message
/**
 * Permet à l'utilisateur de supprimer un de ses messages.
 * @route DELETE /api/user/messages/:id
 * @param {string} id - Identifiant du message à supprimer
 * @returns {Object} Succès ou message d'erreur
 */
exports.deleteMyMessage = async (req, res) => {
  try {
    const userId = req.user.userId;
    const messageId = req.params.id;

    // Retirer l'utilisateur du tableau 'to'
    const message = await Message.findByIdAndUpdate(
      messageId,
      { $pull: { to: userId } },
      { new: true }
    );

    // Si plus aucun destinataire, supprimer le message
    if (message && message.to.length === 0) {
      await Message.findByIdAndDelete(messageId);
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du message." });
  }
};

/**
 * Permet à l'utilisateur de répondre à l'admin.
 * @route POST /api/user/reply-admin
 * @param {string} subject - Sujet du message
 * @param {string} body - Contenu du message
 * @returns {Object} Succès ou message d'erreur
 */
exports.replyToAdmin = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { subject, body } = req.body;
    // Récupérer tous les admins
    const admins = await User.find({ type: 'admin' });
    const adminIds = admins.map(a => a._id);

    const message = new Message({
      to: adminIds,
      from: userId,
      subject,
      body
    });
    await message.save();
    res.json({ success: true, message });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'envoi du message à l'admin." });
  }
}; 