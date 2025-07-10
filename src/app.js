// src/app.js
import express from 'express';
import { port, sessionMiddleware } from './config/index.js';
import { testDbConnection } from './models/index.js';
import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(express.json());
app.use(sessionMiddleware);

// Mount routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes); // this already includes authMiddleware inside taskRoutes

// Global error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

testDbConnection();
export default app;
