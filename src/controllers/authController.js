// src/controllers/authController.js
import jwt from 'jsonwebtoken';

export const login = (req, res) => {
  const { username, password } = req.body;

  // 🔒 Replace this with proper DB lookup and password check
  if (username === 'admin' && password === 'password123') {
    const user = { id: 1, username }; // This is the payload
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).json({ error: 'Invalid credentials' });
};
