const jwt = require('jsonwebtoken');

/**
 * Middleware d'authentification pour vérifier la présence et la validité du token JWT.
 *
 * @function authMiddleware
 * @memberof module:middlewares/authMiddleware
 * @param {Express.Request} req - Objet requête Express
 * @param {Express.Response} res - Objet réponse Express
 * @param {Function} next - Fonction de rappel pour passer au middleware suivant
 * @returns {void}
 *
 * @throws {401} Si le token est manquant, mal formé ou invalide
 *
 * @example
 * // Utilisation sur une route protégée
 * router.get('/profile', authMiddleware, controller.getProfile);
 */
module.exports = function authMiddleware(req, res, next) {
  // Récupère le token depuis l'en-tête (header) de la requête.
  // Le format attendu est "Bearer VOTRE_TOKEN"
  const authHeader = req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Accès non autorisé, token manquant ou mal formaté' });
  }

  const token = authHeader.split(' ')[1];

  // Vérifie si le token existe
  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé, token manquant' });
  }

  // Vérifie la validité du token
  try {
    // jwt.verify décode le token. S'il est invalide ou expiré, il lève une erreur.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ajoute les informations de l'utilisateur (contenues dans le token) à l'objet `req`.
    // Ainsi, les routes protégées pourront savoir quel utilisateur fait la demande.
    req.user = decoded; 
    
    // Passe au prochain middleware ou à la fonction du contrôleur.
    next(); 
  } catch (err) {
    res.status(401).json({ message: 'Token non valide' });
  }
};