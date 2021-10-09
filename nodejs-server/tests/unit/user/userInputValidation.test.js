const { userSchema } = require('../../../server/schemas');

let user = {
  firstname: 'mostafa',
  lastname: 'moneib',
  email: 'aaa@hotmail.com',
  password: '12345678',
};

test('validate create user input --> success', () => {
  try {
    userSchema.userCreateRequestSchema(user);
    expect(true).toBe(true); // test succeed if no error thrown
    // eslint-disable-next-line no-empty
  } catch (error) {}
});

test('validate update user input --> success', () => {
  user = {
    firstname: 'mohamed',
    lastname: 'moenib',
  };
  try {
    userSchema.userUpdateRequestSchema(user);
    expect(true).toBe(true); // test succeed if no error thrown
    // eslint-disable-next-line no-empty
  } catch (error) {}
});

test('validate create user invalid input --> fail', () => {
  user.password = 1234;
  try {
    userSchema.userCreateRequestSchema(user);
  } catch (error) {
    expect(error.statusCode).toBe(422);
  }
});

test('validate update user invalid input --> fail', () => {
  user.password = 1234;
  try {
    userSchema.userUpdateRequestSchema(user);
  } catch (error) {
    expect(error.statusCode).toBe(422);
  }
});

test('validate create user empty input --> fail', () => {
  user = {};
  try {
    userSchema.userCreateRequestSchema(user);
  } catch (error) {
    expect(error.statusCode).toBe(422);
    expect(error.message).toBe('Input values cannot be recognized');
  }
});

test('validate update user empty input --> fail', () => {
  user = {};
  try {
    userSchema.userUpdateRequestSchema(user);
  } catch (error) {
    expect(error.statusCode).toBe(422);
    expect(error.message).toBe('Input values cannot be recognized');
  }
});
