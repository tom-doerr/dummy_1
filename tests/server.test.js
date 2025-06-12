const request = require('supertest');
const app = require('../server');

describe('Task API', () => {
  it('GET /api/tasks should return empty array initially', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /api/tasks should create a task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'test task' })
      .set('Content-Type', 'application/json');
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('title', 'test task');
    expect(res.body).toHaveProperty('id');
  });
});
