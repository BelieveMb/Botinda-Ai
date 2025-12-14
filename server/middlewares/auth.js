// middleware/auth.js
import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = localStorage.getItem('token') || req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Accès refusé. Veuillez vous connecter.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: 'uuid' }
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token invalide.' });
  }
};