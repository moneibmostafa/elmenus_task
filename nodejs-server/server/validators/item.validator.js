const BaseValidator = require('./baseValidator');

module.exports = class ItemValidator extends BaseValidator {
  constructor() {
    super({
      name: 'Item',
    });
  }
};
