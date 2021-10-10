/* eslint-disable no-param-reassign */
const BaseValidator = require('./baseValidator');
const config = require('../../config');
const errors = require('../../errors/errors');

const { minAcceptablePayment, maxAcceptablePayment } = config.server;

module.exports = class OrderValidator extends BaseValidator {
  constructor() {
    super({
      name: 'Order',
    });
  }

  validate(items) {
    // Fraud Detection
    const totalPrice = this.validateMaxValuePaymentFraud(items);

    // Validation Rules
    this.validateBasketItemsAvailability(items);
    this.validateMinPurchaseValue(totalPrice);
    return { totalPrice };
  }

  validateMaxValuePaymentFraud(items) {
    let totalPrice = 0;
    for (let i = 0; i < items.length; i += 1) {
      totalPrice += items[i].item.price * items[i].count;
    }
    if (totalPrice > maxAcceptablePayment)
      throw new errors.BadRequest(
        `Fraud operation: cannot execute purchase over ${maxAcceptablePayment}`
      );
    return totalPrice;
  }

  validateBasketItemsAvailability(items) {
    const unavailableItems = [];
    for (let i = 0; i < items.length; i += 1) {
      items[i].item.availabilityCount -= items[i].count;
      items[i].item.available = items[i].item.availabilityCount > 0;
      if (items[i].item.availabilityCount < 0)
        unavailableItems.push(items[i].item.id);
    }
    if (unavailableItems.length > 0)
      throw new errors.BadRequest(
        `Items with following ids are not available with desirable quantities ${unavailableItems}`
      );
  }

  validateMinPurchaseValue(totalPrice) {
    if (totalPrice < minAcceptablePayment)
      throw new errors.BadRequest(
        `Min order price should be more than ${minAcceptablePayment}`
      );
  }
};
