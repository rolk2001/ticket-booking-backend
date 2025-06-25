const Message = require('../models/Message');
const User = require('../models/User');

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