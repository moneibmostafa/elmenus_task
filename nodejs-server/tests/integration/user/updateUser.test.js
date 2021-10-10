const request = require('supertest');
const app = require('../../../server/startup');
const UserAdapter = require('../../../server/adapters/database/user.adapter');

let user = {
  firstname: 'updatedname',
  password: '12345678',
};

jest.mock('./../../../server/adapters/database/user.adapter', () =>
  jest.fn().mockImplementation(() => ({
    update: jest.fn().mockReturnValueOnce(true),
    getByPk: jest
      .fn()
      .mockReturnValueOnce({
        firstname: 'userfirstname',
        lastname: 'userlastname',
        email: 'user@test.com',
        password: '11111111',
      })
      .mockReturnValueOnce(null),
  }))
);

describe('user update', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    UserAdapter.mockClear();
  });

  test('update user successfully', async () => {
    const response = await request(app)
      .put('/api/user/b7ea5136-13a3-4f22-94d6-bb5dd37ececc')
      .send(user);
    expect(response.statusCode).toBe(200);
  });

  test('update user does not exist', async () => {
    const response = await request(app)
      .put('/api/user/b7ea5136-13a3-4f22-94d6-bb5dd37ececc')
      .send(user);
    expect(response.statusCode).toBe(404);
  });

  test('invalid input', async () => {
    user.password = 1234;
    const response = await request(app)
      .put('/api/user/b7ea5136-13a3-4f22-94d6-bb5dd37ececc')
      .send(user);
    expect(response.statusCode).toBe(422);
  });

  test('empty input', async () => {
    user = {};
    const response = await request(app)
      .put('/api/user/b7ea5136-13a3-4f22-94d6-bb5dd37ececc')
      .send(user);
    expect(response.statusCode).toBe(422);
  });
});
