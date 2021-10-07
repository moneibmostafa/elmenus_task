const BaseAdapter = require('./BaseAdapter');

module.exports = class UserAdapter extends BaseAdapter {
  constructor() {
    super({
      name: 'User',
      model: 'User',
    });
  }

  async create(payload) {
    try {
      const user = await super.create(payload);
      delete user.dataValues.password;
      return user;
    } catch (error) {
      return super.handleError(error);
    }
  }

  async getByPk(userID) {
    try {
      const user = await super.getByPk(userID);
      delete user.dataValues.password;
      return user;
    } catch (error) {
      return super.handleError(error);
    }
  }

  async getOne(filter) {
    try {
      const user = await super.getOne(filter);
      delete user.dataValues.password;
      return user;
    } catch (error) {
      return super.handleError(error);
    }
  }

  async update(userID, payload) {
    try {
      const response = await super.update(userID, payload);
      return response;
    } catch (error) {
      return super.handleError(error);
    }
  }
};
