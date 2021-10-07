const BaseController = require('./Controller');
const { userController, itemController } = require('.');
const { OrderAdapter } = require('../adapters/mysql_database');
const errors = require('../../errors/errors');

module.exports = class OrderController extends BaseController {
  constructor() {
    super({
      adapter: new OrderAdapter(),
      primaryKey: 'id',
    });
  }

  validateUserFraud(order) {
    if (order.totalMoney > 1500)
      throw new errors.BadRequest('Fraud transaction');
  }

//   async validateOrder() {}

  /*
    cart:
    items[]
  */
  async checkout(userID, cart) {
    const user = await userController.getUserByID(userID);
    if (!user) throw new errors.Forbidden('Invalid user');

    const items = await Promise.map(cart, (item) =>
      itemController.getItemByID(item)
    );
    console.log(items);
  }
};
