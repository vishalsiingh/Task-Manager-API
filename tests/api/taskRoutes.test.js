const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../app');
const Task = require('../../models/Task');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Task.deleteMany();
});

describe('API /api/tasks', () => {
  it('GET /api/tasks should return empty array initially', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /api/tasks should create a task', async () => {
    const res = await request(app).post('/api/tasks').send({ title: 'New Task' });
    expect([200, 201]).toContain(res.statusCode);

    expect(res.body.title).toBe('New Task');
  });

  it('PUT /api/tasks/:id should update task status', async () => {
    const task = await Task.create({ title: 'Status Test' });
    const res = await request(app).put(`/api/tasks/${task._id}`).send({ status: 'completed' });
    expect(res.body.status).toBe('completed');
  });

  it('DELETE /api/tasks/:id should delete task', async () => {
    const task = await Task.create({ title: 'Delete Me' });
    const res = await request(app).delete(`/api/tasks/${task._id}`);
    expect(res.statusCode).toBe(200);
  });
});
