const User = require('./User');
const Item = require('./Item');
const Order = require('./Order');
const ItemsOrders = require('./Items_Orders');

const user = new User();
const item = new Item();
const order = new Order();
const itemsorders = new ItemsOrders();

module.exports = {
  user,
  item,
  order,
  itemsorders,
};
