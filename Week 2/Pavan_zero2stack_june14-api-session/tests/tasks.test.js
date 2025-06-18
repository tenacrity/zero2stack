// tests/tasks.test.js
import request from 'supertest';
import express from 'express';
import tasksRouter from '../routes/tasks.js';

const app = express();
app.use(express.json());
app.use('/tasks', tasksRouter);

describe('Task API', () => {
  let taskId;

  test('POST /tasks - Create a new task', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({ text: 'Test Task' });
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    taskId = response.body.data.id;
  });

  test('GET /tasks - Get all tasks', async () => {
    const response = await request(app).get('/tasks');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test('DELETE /tasks/:id - Delete a task', async () => {
    const response = await request(app).delete(`/tasks/${taskId}`);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});