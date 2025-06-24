const Message = require('../models/Message');

// Récupérer les messages de l'utilisateur connecté
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