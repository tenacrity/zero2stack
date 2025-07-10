import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/index.js';

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token missing' });
  }

  const token = authHeader.split(' ')[1];
  try {
    req.user = jwt.verify(token, jwtSecret);
    next();
  } catch {
    res.status(403).json({ error: 'Invalid token' });
  }
}
