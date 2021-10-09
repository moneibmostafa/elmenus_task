const request = require('supertest');
const app = require('../../../server/startup');
const ItemAdapter = require('../../../server/adapters/database/item.adapter');

let item = {
  availabilityCount: 10,
  price: 50,
};

jest.mock('./../../../server/adapters/database/item.adapter', () =>
  jest.fn().mockImplementation(() => ({
    update: jest.fn().mockReturnValueOnce(true),
  }))
);

describe('item update', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    ItemAdapter.mockClear();
  });

  test('update item successfully', async () => {
    const response = await request(app)
      .put('/api/item/b7ea5136-13a3-4f22-94d6-bb5dd37ececc')
      .send(item);
    expect(response.statusCode).toBe(200);
  });

  test('invalid price more than 1500', async () => {
    item.price = 2000;
    const response = await request(app)
      .put('/api/item/b7ea5136-13a3-4f22-94d6-bb5dd37ececc')
      .send(item);
    expect(response.statusCode).toBe(422);
  });

  test('empty input', async () => {
    item = {};
    const response = await request(app)
      .put('/api/item/b7ea5136-13a3-4f22-94d6-bb5dd37ececc')
      .send(item);
    expect(response.statusCode).toBe(422);
  });
});
