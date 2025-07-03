import assert from 'assert';
import request from 'supertest';
import express from 'express';
import tasksRouter from '../routes/tasks.js';

// Setup Express app with the tasks router
const app = express();
app.use(express.json());
app.use('/tasks', tasksRouter);

// Basic assertion test
describe('Sample Unit Test', () => {
  it('should return true', () => {
    assert.strictEqual(true, true);
  });
});

// Task API tests
describe('Task API Integration Tests', () => {
  let taskId;

  test('POST /tasks - Create a new task', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({ title: 'Test Task', completed: false });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('title', 'Test Task');
    taskId = response.body.id; // Adjust based on your controller's response shape
  });

  test('GET /tasks - Get all tasks', async () => {
    const response = await request(app).get('/tasks');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('DELETE /tasks/:id - Delete a task', async () => {
    const response = await request(app).delete(`/tasks/${taskId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
  });
});
