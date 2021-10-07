const BaseController = require('./Controller');
const { ItemAdapter } = require('../adapters/mysql_database');
const errors = require('../../errors/errors');

module.exports = class ItemController extends BaseController {
  constructor() {
    super({
      adapter: new ItemAdapter(),
      primaryKey: 'id',
    });
  }

  async createItem(body) {
    try {
      const payload = { ...body };
      payload.available = false;
      if (payload.availabilityCount > 0) payload.available = true;
      payload.price = payload.price.toFixed(2);
      const item = await super.create(payload);
      return item;
    } catch (error) {
      return super.handleError(error);
    }
  }

  async getItemByID(itemID) {
    try {
      const item = await super.getByPk(itemID);
      if (!item) throw new errors.NotFound(`item not found`);
      return item;
    } catch (error) {
      return super.handleError(error);
    }
  }

  async updateItem(itemID, body) {
    try {
      const payload = { ...body };
      if (
        payload.availabilityCount === undefined &&
        payload.price === undefined
      ) {
        throw new errors.UnprocessableEntity('Invalid parameters update');
      }
      if (payload.availabilityCount !== undefined) {
        payload.available = false;
        if (payload.availabilityCount > 0) payload.available = true;
      }
      if (payload.price) payload.price = payload.price.toFixed(2);
      const response = await super.update(itemID, payload);
      return response;
    } catch (error) {
      return super.handleError(error);
    }
  }
};
