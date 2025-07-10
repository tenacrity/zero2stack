// src/middleware/session.js
import session from 'express-session';
import config from '../config/index.js';

const sessionMiddleware = session({
  secret: config.sessionConfig.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: config.env === 'production', // Set to true in production with HTTPS
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
});

export default sessionMiddleware;
