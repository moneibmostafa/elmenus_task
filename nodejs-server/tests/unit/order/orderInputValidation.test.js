const { orderSchema } = require('../../../server/schemas');
const errors = require('../../../errors/errors');

const req = {
  body: {
    userID: 'b7ea5136-13a3-4f22-94d6-bb5dd37ececc',
    cart: [
      { itemID: 'fe2a5148-f777-412a-b3ef-7c5063275f24', count: 2 },
      { itemID: '9ddfa66d-75ae-4674-bd6c-41276d4c9bea', count: 2 },
    ],
    paymentInfo: {
      token: 'tok_ae',
      currency: 'usd',
    },
  },
};
const res = {};
const next = () => {};

test('validate create order input --> success', () => {
  try {
    orderSchema.orderCreateRequestSchema(req, res, next);
    expect(true).toBe(true); // test succeed if no error thrown
  } catch (error) {
    expect(true).toBe(false); // test fail if error thrown
  }
});

test('validate create order invalid input --> fail', () => {
  req.body.userID = 1234;
  try {
    orderSchema.orderCreateRequestSchema(req, res, next);
  } catch (error) {
    expect(error.statusCode).toBe(422);
    expect(error).toBeInstanceOf(errors.UnprocessableEntity);
  }
});

test('validate create order empty input --> fail', () => {
  req.body = {};
  try {
    orderSchema.orderCreateRequestSchema(req, res, next);
  } catch (error) {
    expect(error.statusCode).toBe(422);
    expect(error).toBeInstanceOf(errors.UnprocessableEntity);
  }
});
