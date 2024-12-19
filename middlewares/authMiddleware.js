const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assure-toi d'avoir un modèle User pour valider l'utilisateur
const authMiddleware =async (req, res, next) => {
    // const token = req.header('Authorization')?.replace('Bearer ', ''); 
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token)

  if (!token) {
    return res.status(401).json({ message: 'Accès refusé, token manquant' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Décoder le token avec la clé secrète
    req.user = decoded // Récupérer l'utilisateur dans la base de données
    console.log("bonjour", req.user)
    next(); // Passer au middleware suivant
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Token invalide' });
  }
};

module.exports = authMiddleware;
