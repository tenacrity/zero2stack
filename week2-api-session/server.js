import 'dotenv/config'; //Loads environment variables from a .env file into process.env
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import taskRoutes from './routes/tasks.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(logger);

//routes
app.use('/tasks', taskRoutes);

//error handling
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});