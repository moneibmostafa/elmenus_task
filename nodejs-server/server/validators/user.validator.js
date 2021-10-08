const BaseValidator = require('./baseValidator');

module.exports = class UserValidator extends BaseValidator {
  constructor() {
    super({
      name: 'User',
    });
  }
};
