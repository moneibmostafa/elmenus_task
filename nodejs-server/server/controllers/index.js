const UserController = require('./user.controller');
const ItemController = require('./item.controller');
const CheckoutController = require('./checkout.controller');

const userController = new UserController();
const itemController = new ItemController();
const checkoutController = new CheckoutController();

module.exports = {
  userController,
  itemController,
  checkoutController,
};
