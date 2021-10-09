const request = require('supertest');
const app = require('../../../server/startup');

let user = {
  firstname: 'mostafa',
  lastname: 'moneib',
  email: 'aaa@hotmail.com',
  password: '12345678',
};

const mockGetOne = jest.fn(undefined);
const mockCreate = jest.fn();
jest.mock('../../../server/adapters/database/user.adapter', () =>
  jest.fn().mockImplementation(() => ({
    getOne: () => mockGetOne,
    create: () => mockCreate,
  }))
);

describe('user create', () => {
  test('create user successfully', async (done) => {
    const response = await request(app).post('/api/user').send(user);
    expect(response.statusCode === 201);
  });

  test('invalid input', async () => {
    user.password = 1234;
    const response = await request(app).post('/api/user').send(user);
    expect(response.statusCode === 422);
  });

  test('empty input', async () => {
    user = {};
    const response = await request(app).post('/api/user').send(user);
    expect(response.statusCode === 422);
  });
});
