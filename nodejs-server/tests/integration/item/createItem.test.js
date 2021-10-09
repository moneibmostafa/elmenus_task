const request = require('supertest');
const app = require('../../../server/startup');
const ItemAdapter = require('../../../server/adapters/database/item.adapter');

let item = {
  name: 'charger',
  availabilityCount: 10,
  price: 50,
};

jest.mock('./../../../server/adapters/database/item.adapter', () =>
  jest.fn().mockImplementation(() => ({
    create: jest.fn().mockReturnValueOnce({
      name: 'charger',
      availabilityCount: 10,
      price: 50,
      available: true,
    }),
  }))
);

describe('item create', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    ItemAdapter.mockClear();
  });

  test('create item successfully', async () => {
    const response = await request(app).post('/api/item').send(item);
    expect(response.statusCode).toBe(201);
  });

  test('item price above 1500', async () => {
    item.price = 2000;
    const response = await request(app).post('/api/item').send(item);
    expect(response.statusCode).toBe(422);
  });

  test('empty input', async () => {
    item = {};
    const response = await request(app).post('/api/item').send(item);
    expect(response.statusCode).toBe(422);
  });
});
