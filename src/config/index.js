import dotenv from 'dotenv';
dotenv.config();

import session from 'express-session';

// Database configuration
export const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
  url: process.env.DATABASE_URL, // Optional full connection string
};

// Session configuration
export const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' },
};

// Session middleware (based on the session config)
export const sessionMiddleware = session(sessionConfig);

// JWT secret
export const jwtSecret = process.env.JWT_SECRET;

// Server port
export const port = process.env.PORT || 3000;

export default {
  dbConfig,
  sessionConfig,
  port,
  jwtSecret
};