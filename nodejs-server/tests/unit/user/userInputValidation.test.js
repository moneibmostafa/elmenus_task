const { userSchema } = require('../../../server/schemas');
const errors = require('../../../errors/errors');

const req = {
  body: {
    firstname: 'testuser',
    lastname: 'lastname',
    email: 'user@test.com',
    password: '12345678',
  },
};
const res = {};
const next = () => {};

test('validate create user input --> success', () => {
  try {
    userSchema.userCreateRequestSchema(req, res, next);
    expect(true).toBe(true); // test succeed if no error thrown
  } catch (error) {
    expect(true).toBe(false); // test fail if error thrown
  }
});

test('validate update user input --> success', () => {
  req.body = {
    firstname: 'update firstname',
    lastname: 'update lastname',
  };
  try {
    userSchema.userUpdateRequestSchema(req, res, next);
    expect(true).toBe(true); // test succeed if no error thrown
  } catch (error) {
    expect(true).toBe(false); // test fail if error thrown
  }
});

test('validate create user invalid input --> fail', () => {
  req.body.password = 1234;
  try {
    userSchema.userCreateRequestSchema(req, res, next);
    expect(true).toBe(false); // test fail if no error thrown
  } catch (error) {
    expect(error.statusCode).toBe(422);
    expect(error).toBeInstanceOf(errors.UnprocessableEntity);
  }
});

test('validate update user invalid input --> fail', () => {
  req.body.password = 1234;
  try {
    userSchema.userUpdateRequestSchema(req, res, next);
    expect(true).toBe(false); // test fail if no error thrown
  } catch (error) {
    expect(error.statusCode).toBe(422);
    expect(error).toBeInstanceOf(errors.UnprocessableEntity);
  }
});

test('validate create user empty input --> fail', () => {
  req.body = {};
  try {
    userSchema.userCreateRequestSchema(req, res, next);
    expect(true).toBe(false); // test fail if no error thrown
  } catch (error) {
    expect(error.statusCode).toBe(422);
    expect(error).toBeInstanceOf(errors.UnprocessableEntity);
  }
});

test('validate update user empty input --> fail', () => {
  req.body = {};
  try {
    userSchema.userUpdateRequestSchema(req, res, next);
    expect(true).toBe(false); // test fail if no error thrown
  } catch (error) {
    expect(error.statusCode).toBe(422);
    expect(error).toBeInstanceOf(errors.UnprocessableEntity);
  }
});
