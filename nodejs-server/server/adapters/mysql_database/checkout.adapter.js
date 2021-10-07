const BaseAdapter = require('./BaseAdapter');

module.exports = class OrderAdapter extends BaseAdapter {
  constructor() {
    super({
      name: 'Order',
      model: 'Order',
    });
  }

  async create(payload) {
    try {
      const order = await super.create(payload);
      return order;
    } catch (error) {
      return super.handleError(error);
    }
  }

  async getByPk(orderID) {
    try {
      const item = await super.getByPk(orderID);
      return item;
    } catch (error) {
      return super.handleError(error);
    }
  }
};
