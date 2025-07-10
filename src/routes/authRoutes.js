import express from 'express';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/index.js';

const router = express.Router();

// SESSION login (POST /auth/login)
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Mock user
  if (username === 'admin' && password === 'pass123') {
    req.session.user = { id: 1, username };
    return res.json({ message: 'Logged in with session' });
  }

  res.status(401).json({ error: 'Invalid credentials' });
});

// JWT login (POST /auth/token)
router.post('/token', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'pass123') {
    const token = jwt.sign({ id: 1, username }, jwtSecret, { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).json({ error: 'Invalid credentials' });
});

// Logout (GET /auth/logout)
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out' });
  });
});

export default router;
