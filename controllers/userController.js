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