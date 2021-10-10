/* eslint-disable dot-notation */
const Promise = require('bluebird');
const db = require('../../../database');
const { logger } = require('../../../logger');
const BaseAdapter = require('./baseAdapter');

module.exports = class OrderAdapter extends BaseAdapter {
  constructor() {
    super({
      name: 'Order',
      model: 'Order',
    });
  }

  async createOrderAndUpdateItems(orderPayload, modifiedCartItems) {
    logger.log('info', 'Creating Order and updating items in database');
    let order;
    await db.transaction(async (transaction) => {
      // 1) create new order in database
      order = await this.model.create(orderPayload, { transaction });

      // 2) update items with purchased quantaties
      const items = [];
      await Promise.map(modifiedCartItems, async (cartItem) => {
        items.push(cartItem.item);
        const payload = {
          availabilityCount: cartItem.item.availabilityCount,
          available: cartItem.item.available,
        };
        await cartItem.item.update(payload, { transaction });
      });

      // 3) add items into created order
      await order.addItems(items, { transaction });
    });
    return order;
  }
};
