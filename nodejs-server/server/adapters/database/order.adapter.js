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

  async createOrderAndUpdateItems(orderPayload, items, modifiedCartItems) {
    logger.log('info', 'Creating Order and updating items in database');
    let order;
    await db.transaction(async (transaction) => {
      order = await this.model.create(orderPayload, { transaction });
      await order.addItems(items, { transaction });

      await Promise.map(modifiedCartItems, async (cartItem) => {
        const availabilityCount =
          cartItem.item.availabilityCount - cartItem.count;
        const payload = {
          availabilityCount,
        };
        if (availabilityCount < 1) payload['available'] = false;
        await cartItem.item.update(payload, { transaction });
      });
    });
    return order;
  }
};
