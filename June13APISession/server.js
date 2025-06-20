// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';
import tasksRouter from './routes/tasks.js';

const app = express();
const PORT = process.env.PORT || 3000;

// For __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(logger);

// Serve static files (e.g., public/index.html, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Optional: Serve index.html at root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API Routes
app.use('/tasks', tasksRouter);

// Health check (optional but useful)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Error Handling Middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
