const request = require('supertest');
const {expect} = require('chai');
const app = require('../server');

describe('Task API', () => {
  beforeEach(() => {
    app.reset();
  });

  it('GET /api/tasks returns empty array', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.deep.equal([]);
  });

  it('POST /api/tasks creates a task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({title: 'Test Task'});
    expect(res.statusCode).to.equal(201);
    expect(res.body).to.deep.equal({id: 1, title: 'Test Task'});
  });

  it('GET after POST returns task', async () => {
    await request(app).post('/api/tasks').send({title: 'Sample'});
    const res = await request(app).get('/api/tasks');
    expect(res.body.length).to.equal(1);
    expect(res.body[0].title).to.equal('Sample');
  });

  it('POST without title returns 400', async () => {
    const res = await request(app).post('/api/tasks').send({});
    expect(res.statusCode).to.equal(400);
  });

  it('DELETE removes task', async () => {
    await request(app).post('/api/tasks').send({title: 'Del'});
    const resDel = await request(app).delete('/api/tasks/1');
    expect(resDel.statusCode).to.equal(204);
    const res = await request(app).get('/api/tasks');
    expect(res.body).to.deep.equal([]);
  });
});
