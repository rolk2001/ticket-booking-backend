const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
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