import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js'; // Optional logging middleware
import taskRoutes from './routes/taskroutes.js'; // Unified task routes

const app = express();
const PORT = process.env.PORT || 3000;

// For ES Modules __dirname compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(logger); // Optional custom logger

// Static files (public/index.html, styles, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Optional home route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// API routes
app.use('/api/tasks', taskRoutes);

// Error handler (should be last middleware)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
