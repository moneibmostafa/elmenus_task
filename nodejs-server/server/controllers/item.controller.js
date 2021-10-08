const BaseController = require('./baseController');
const { ItemValidator } = require('../validators');
const { ItemAdapter } = require('../adapters/database');

class ItemController extends BaseController {
  constructor() {
    super({
      adapter: new ItemAdapter(),
      validator: new ItemValidator(),
      primaryKey: 'id',
      name: 'item',
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

  async updateItem(itemID, body) {
    try {
      const payload = { ...body };
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
}

const itemController = new ItemController();
Object.freeze(itemController);

module.exports = itemController;
