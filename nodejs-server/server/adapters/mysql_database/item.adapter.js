const BaseAdapter = require('./BaseAdapter');

module.exports = class ItemAdapter extends BaseAdapter {
  constructor() {
    super({
      name: 'Item',
      model: 'Item',
    });
  }

  async create(payload) {
    try {
      const item = await super.create(payload);
      return item;
    } catch (error) {
      return super.handleError(error);
    }
  }

  async getByPk(itemID) {
    try {
      const item = await super.getByPk(itemID);
      return item;
    } catch (error) {
      return super.handleError(error);
    }
  }

  async update(itemID, payload) {
    try {
      const response = await super.update(itemID, payload);
      return response;
    } catch (error) {
      return super.handleError(error);
    }
  }
};
