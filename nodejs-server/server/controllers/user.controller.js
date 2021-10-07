const BaseController = require('./Controller');
const { UserAdapter } = require('../adapters/mysql_database');
const errors = require('../../errors/errors');

module.exports = class UserController extends BaseController {
  constructor() {
    super({
      adapter: new UserAdapter(),
      primaryKey: 'id',
    });
  }

  async createUser(payload) {
    try {
      let user = await super.getOne({ email: payload.email });
      if (user) throw new errors.Conflict('user already exists');
      user = await super.create(payload);
      return user;
    } catch (error) {
      return super.handleError(error);
    }
  }

  async getUserByID(userID) {
    try {
      const user = await super.getByPk(userID);
      if (!user) throw new errors.NotFound(`User not found`);
      return user;
    } catch (error) {
      return super.handleError(error);
    }
  }

  async updateUser(userID, payload) {
    try {
      const response = await super.update(userID, payload);
      return response;
    } catch (error) {
      return super.handleError(error);
    }
  }
};
