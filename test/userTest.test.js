// test/user.test.js
const request = require('supertest');
const { app, server } = require('../server'); // Import the server and app

describe('User API', () => {

  // Test GET route
  it('should get all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  // Test POST route
  it('should create a new user', async () => {
    const user = { name: 'John Doe', email: 'john@example.com' };
    const res = await request(app).post('/api/users').send(user);
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe('John Doe');
    expect(res.body.email).toBe('john@example.com');
  });

  // Test POST route validation
  it('should return 400 for missing name or email', async () => {
    const user = { name: 'John Doe' }; // Missing email
    const res = await request(app).post('/api/users').send(user);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Name and email are required');
  });

});

// Ensure that Jest gracefully shuts down the server after tests
afterAll(() => {
  server.close();
});
