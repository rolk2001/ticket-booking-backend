const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * @file adminMiddleware.js
 * @brief Middleware pour vérifier si l'utilisateur est authentifié et possède le rôle admin.
 * @function adminMiddleware
 * @param {Object} req Objet requête Express
 * @param {Object} res Objet réponse Express
 * @param {Function} next Fonction de rappel pour passer au middleware suivant
 * @returns {void}
 * @example
 * router.use(adminMiddleware); // Protège toutes les routes suivantes
 */
const adminMiddleware = async (req, res, next) => {
  try {
    // Récupérer le token depuis le header Authorization
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Token manquant' });
    }

    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Récupérer l'utilisateur
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier si l'utilisateur est admin
    if (user.type !== 'admin') {
      return res.status(403).json({ message: 'Accès refusé. Rôle admin requis.' });
    }

    // Ajouter l'utilisateur à la requête
    req.user = user;
    next();
  } catch (error) {
    console.error('Erreur adminMiddleware:', error);
    res.status(401).json({ message: 'Token invalide' });
  }
};

module.exports = adminMiddleware; 