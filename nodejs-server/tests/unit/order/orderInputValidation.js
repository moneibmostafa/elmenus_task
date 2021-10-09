const { orderSchema } = require('../../../server/schemas');

let order = {
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

test('validate create order input --> success', () => {
  try {
    orderSchema.orderCreateRequestSchema(order);
    expect(true).toBe(true); // test succeed if no error thrown
    // eslint-disable-next-line no-empty
  } catch (error) {}
});

test('validate create order invalid input --> fail', () => {
  order.userID = 1234;
  try {
    orderSchema.orderCreateRequestSchema(order);
  } catch (error) {
    expect(error.statusCode).toBe(422);
  }
});

test('validate create order empty input --> fail', () => {
  order = {};
  try {
    orderSchema.orderCreateRequestSchema(order);
  } catch (error) {
    expect(error.statusCode).toBe(422);
    expect(error.message).toBe('Input values cannot be recognized');
  }
});
