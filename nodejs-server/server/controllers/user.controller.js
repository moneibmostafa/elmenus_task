const BaseController = require('./baseController');
const { UserValidator } = require('../validators');
const { UserAdapter } = require('../adapters/database');
const errors = require('../../errors/errors');

class UserController extends BaseController {
  constructor() {
    super({
      adapter: new UserAdapter(),
      validator: new UserValidator(),
      primaryKey: 'id',
      name: 'user',
    });
  }

  async createUser(payload) {
    try {
      let user = await super.getOne({ email: payload.email });
      console.log('kkkkkkkkkkkkkk', user)
      if (user) throw new errors.Conflict('user already exists');
      user = await super.create(payload);
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
}

const userController = new UserController();
Object.freeze(userController);

module.exports = userController;
