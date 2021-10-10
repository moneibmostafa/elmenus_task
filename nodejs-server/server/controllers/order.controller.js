/* eslint-disable no-shadow */
const Promise = require('bluebird');
const { uuid } = require('uuidv4');
const BaseController = require('./baseController');
const userController = require('./user.controller');
const itemController = require('./item.controller');
const { OrderAdapter } = require('../adapters/database');
const { OrderValidator } = require('../validators');
const creditcardPayment = require('../payment');
const { logger } = require('../../logger');
const errors = require('../../errors/errors');

const { join } = Promise;

class OrderController extends BaseController {
  constructor() {
    super({
      adapter: new OrderAdapter(),
      validator: new OrderValidator(),
      primaryKey: 'id',
      name: 'order',
    });
  }

  async populateCart(cart) {
    const populatedCart = await Promise.map(cart, (cartItem) => {
      const item = itemController.getByPk(cartItem.itemID);
      return join(item, (item) => ({
        item,
        count: cartItem.count,
      }));
    });
    return populatedCart;
  }

  validate(items) {
    return this.validator.validate(items);
  }

  async executePayment(paymentInfo, totalPrice) {
    const { token, currency } = paymentInfo;
    const response = await creditcardPayment(totalPrice, token, currency);
    if (!response) throw new errors.BadRequest('Payment failure');
    logger.log('info', 'Payment successfull');
  }

  async updateModels(user, populatedCart, totalPrice) {
    const orderPayload = {
      [this.primaryKey]: uuid(),
      totalPayment: totalPrice,
      userId: user.id,
    };
    const order = await this.adapter.createOrderAndUpdateItems(
      orderPayload,
      populatedCart
    );
    return order;
  }

  async checkout(requestBody) {
    try {
      const { userID, cart, paymentInfo } = requestBody;
      const user = await userController.getByPk(userID);
      // Populate cart with items by fetching each item from database
      const populatedCart = await this.populateCart(cart);

      // 1) Apply validations before checkout process - will return items updated quantaties + total price
      const { totalPrice } = this.validate(populatedCart);

      // 2) Charge user credit card
      await this.executePayment(paymentInfo, totalPrice);

      // 3) Update Database with purchase
      const order = await this.updateModels(user, populatedCart, totalPrice);
      return order;
    } catch (error) {
      if (error instanceof errors.NotFound)
        throw new errors.BadRequest(error.message);
      return super.handleError(error);
    }
  }
}

const orderController = new OrderController();
Object.freeze(orderController);

module.exports = orderController;
