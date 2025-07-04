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
      .send({
        text: 'Test Task'
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.text).toBe('Test Task');
    expect(response.body.data.done).toBe(false);
    expect(response.body.data.createdAt).toBeDefined();
    
    taskId = response.body.data.id;
  });

  test('GET /tasks - Get all tasks', async () => {
    const response = await request(app)
      .get('/tasks');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('DELETE /tasks/:id - Delete a task', async () => {
    const response = await request(app)
      .delete(`/tasks/${taskId}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Task deleted successfully');
  });

  test('POST /tasks - Should require text', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('Text is required');
  });

  test('DELETE /tasks/:id - Should return 404 for non-existent task', async () => {
    const response = await request(app)
      .delete('/tasks/999');

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('Task not found');
  });
}); 