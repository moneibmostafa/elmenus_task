const { itemSchema } = require('../../../server/schemas');
const config = require('../../../config');
const errors = require('../../../errors/errors');

const { maxAcceptablePayment } = config.server;

const req = {
  body: {
    name: 'item',
    availabilityCount: 10,
    price: 50,
  },
};
const res = {};
const next = () => {};

test('validate create item input --> success', () => {
  try {
    itemSchema.itemCreateRequestSchema(req, res, next);
    expect(true).toBe(true); // test succeed if no error thrown
  } catch (error) {
    expect(true).toBe(false); // test fail if error thrown
  }
});

test('validate update item input --> success', () => {
  req.body = {
    availabilityCount: 20,
    price: 70,
  };
  try {
    itemSchema.itemUpdateRequestSchema(req, res, next);
    expect(true).toBe(true); // test succeed if no error thrown
  } catch (error) {
    expect(true).toBe(false); // test fail if error thrown
  }
});

test('validate create item invalid input --> fail', () => {
  req.body.price = maxAcceptablePayment + 1;
  try {
    itemSchema.itemCreateRequestSchema(req, res, next);
    expect(true).toBe(false); // test fail if no error thrown
  } catch (error) {
    expect(error.statusCode).toBe(422);
    expect(error).toBeInstanceOf(errors.UnprocessableEntity);
  }
});

test('validate update item invalid input --> fail', () => {
  req.body.price = maxAcceptablePayment + 1;
  try {
    itemSchema.itemUpdateRequestSchema(req, res, next);
    expect(true).toBe(false); // test fail if no error thrown
  } catch (error) {
    expect(error.statusCode).toBe(422);
    expect(error).toBeInstanceOf(errors.UnprocessableEntity);
  }
});

test('validate create item empty input --> fail', () => {
  req.body = {};
  try {
    itemSchema.itemCreateRequestSchema(req, res, next);
    expect(true).toBe(false); // test fail if no error thrown
  } catch (error) {
    expect(error.statusCode).toBe(422);
    expect(error).toBeInstanceOf(errors.UnprocessableEntity);
  }
});

test('validate update item empty input --> fail', () => {
  req.body = {};
  try {
    itemSchema.itemUpdateRequestSchema(req, res, next);
    expect(true).toBe(false); // test fail if no error thrown
  } catch (error) {
    expect(error.statusCode).toBe(422);
    expect(error.message).toBe('Input values cannot be recognized');
    expect(error).toBeInstanceOf(errors.UnprocessableEntity);
  }
});
