const db = require('../../../database');
const { logger } = require('../../../logger');
const BaseAdapter = require('./baseAdapter');
const models = require('../../../models');

module.exports = class OrderAdapter extends BaseAdapter {
  constructor() {
    super({
      name: 'Order',
      model: 'Order',
    });
  }

  async createOrderAndUpdateItems(orderPayload, items, modifiedCartItems) {
    try {
      logger.log('info', 'Creating Order and updating items in database');
      const result = await db.transaction(async (t) => {
        const order = await this.model.create(orderPayload, { transaction: t });
        console.log('qqqqqqqqqqqqqq', order);
        order.addItems(items, { transaction: t });

        const updatedItems = await Promise.map(
          modifiedCartItems,
          (cartItem) => {
            const availabilityCount =
              cartItem.item.availabilityCount - cartItem.count;
            cartItem.item.update(
              { availabilityCount: availabilityCount },
              { transaction: t }
            );
          }
        );

        console.log(this.updatedItems);
      });

      // If the execution reaches this line, the transaction has been committed successfully
      // `result` is whatever was returned from the transaction callback (the `user`, in this case)
    } catch (error) {
      console.log('zzzzzzzzzzz', error);
      // If the execution reaches this line, an error occurred.
      // The transaction has already been rolled back automatically by Sequelize!
    }
  }
};
