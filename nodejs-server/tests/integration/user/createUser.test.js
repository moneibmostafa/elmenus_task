const request = require('supertest');
const app = require('../../../server/startup');
const UserAdapter = require('../../../server/adapters/database/user.adapter');

let user = {
  firstname: 'testuser',
  lastname: 'lastname',
  email: 'user@test.com',
  password: '12345678',
};

jest.mock('./../../../server/adapters/database/user.adapter', () =>
  jest.fn().mockImplementation(() => ({
    getOne: jest.fn().mockReturnValueOnce(null).mockReturnValueOnce({
      firstname: 'updated',
      lastname: 'lastname',
      email: 'updated@test.com',
    }),
    create: jest.fn().mockReturnValueOnce({
      firstname: 'updated',
      lastname: 'lastname',
      email: 'updated@test.com',
    }),
  }))
);

describe('user create', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    UserAdapter.mockClear();
  });

  test('create user successfully', async () => {
    const response = await request(app).post('/api/user').send(user);
    expect(response.statusCode).toBe(201);
  });

  test('user already existed', async () => {
    const response = await request(app).post('/api/user').send(user);
    expect(response.statusCode).toBe(409);
  });

  test('invalid input', async () => {
    user.password = 1234;
    const response = await request(app).post('/api/user').send(user);
    expect(response.statusCode).toBe(422);
  });

  test('empty input', async () => {
    user = {};
    const response = await request(app).post('/api/user').send(user);
    expect(response.statusCode).toBe(422);
  });
});
