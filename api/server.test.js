const server = require('./server');
const request = require('supertest');
const db = require('../data/dbConfig');
const Users = require('./users/users-model');
// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

afterAll(async () => {
  await db.destroy();
})

describe('HTTP API tests', () => {
  test('[1] POST /register_Success', async () => {
    let res = await request(server).post('/api/auth/register').send({ username: "sue", password: "1234" });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id', 1);
    expect(res.body).toHaveProperty('username', 'sue');
    expect(res.body).toHaveProperty('password');
    expect(res.body).not.toHaveProperty('password', '1234');
  });
  test('[2] POST /register_Failure', async () => {
    let res = await request(server).post('/api/auth/register').send({ username: null, password: '1234' });
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('message', 'username and password required');
    
    res = await request(server).post('/api/auth/register').send({ username: 'sue', password: null });
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('message', 'username and password required');

    res = await request(server).post('/api/auth/register').send({ username: "sue", password: "1234" });

    res = await request(server).post('/api/auth/register').send({ username: "sue", password: "5678" });
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('message', 'username taken');
  });



  // test('POST /login', async () => {});
  // test('GET /jokes', async () => {});
})

