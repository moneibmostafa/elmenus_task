const request = require('supertest');
const app = require('../../../server/startup');
const UserAdapter = require('../../../server/adapters/database/user.adapter');
const ItemAdapter = require('../../../server/adapters/database/item.adapter');
const OrderAdapter = require('../../../server/adapters/database/order.adapter');

// mock get user by email from database
jest.mock('./../../../server/adapters/database/user.adapter', () =>
  jest.fn().mockImplementation(() => ({
    getByPk: jest.fn().mockReturnValue({
      firstname: 'testuser',
      lastname: 'lastname',
      email: 'user@test.com',
    }),
  }))
);

// mock get items by id from database
jest.mock('./../../../server/adapters/database/item.adapter', () =>
  jest.fn().mockImplementation(() => ({
    getByPk: jest
      .fn()
      .mockReturnValueOnce({
        id: 'fe2a5148-f777-412a-b3ef-7c5063275f24',
        availabilityCount: 2,
        available: true,
        price: 40,
        name: 'itemOne',
      })
      .mockReturnValueOnce({
        id: '9ddfa66d-75ae-4674-bd6c-41276d4c9bea',
        availabilityCount: 2,
        available: true,
        price: 40,
        name: 'itemTwo',
      }),
  }))
);

// mock create order call to database
jest.mock('./../../../server/adapters/database/order.adapter', () =>
  jest.fn().mockImplementation(() => ({
    createOrderAndUpdateItems: jest.fn().mockReturnValue({
      id: 'f3762c56-e87d-4212-b1cf-48e14849473a',
      totalPayment: 700,
      userId: 'b7ea5136-13a3-4f22-94d6-bb5dd37ececc',
    }),
  }))
);

// mock credit card charge call
jest.mock('./../../../server/payment/creditcardCharging', () =>
  jest.fn().mockReturnValue(true)
);

let order;
describe('order create', () => {
  beforeEach(() => {
    order = {
      userID: 'b7ea5136-13a3-4f22-94d6-bb5dd37ececc',
      cart: [
        { itemID: 'fe2a5148-f777-412a-b3ef-7c5063275f24', count: 2 },
        { itemID: '9ddfa66d-75ae-4674-bd6c-41276d4c9bea', count: 2 },
      ],
      paymentInfo: {
        token: 'tok_ae',
        currency: 'usd',
      },
    };
    UserAdapter.mockClear();
    ItemAdapter.mockClear();
    OrderAdapter.mockClear();
  });

  test('create order successfully', async () => {
    const response = await request(app).post('/api/order').send(order);
    expect(response.statusCode).toBe(201);
  });

  test('create order min value should be over 100', async () => {
    order.cart[0].count = 1;
    order.cart[1].count = 1;
    const response = await request(app).post('/api/order').send(order);
    expect(response.statusCode).toBe(400);
  });

  test('create order max value should be under 1500', async () => {
    order.cart[0].count = 20;
    order.cart[1].count = 20;
    const response = await request(app).post('/api/order').send(order);
    expect(response.statusCode).toBe(400);
  });

  test('create order items not available', async () => {
    order.cart[0].count = 4;
    order.cart[1].count = 4;
    const response = await request(app).post('/api/order').send(order);
    expect(response.statusCode).toBe(400);
  });

  test('invalid input', async () => {
    order.cart[0].count = 0;
    const response = await request(app).post('/api/order').send(order);
    expect(response.statusCode).toBe(422);
  });

  test('empty input', async () => {
    order = {};
    const response = await request(app).post('/api/order').send(order);
    expect(response.statusCode).toBe(422);
  });
});
