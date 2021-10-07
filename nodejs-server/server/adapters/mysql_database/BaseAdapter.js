const { logger } = require('../../../logger');
const models = require('../../../models');

module.exports = class BaseAdapter {
  constructor({ name, model, path = undefined }) {
    this.name = name;
    this.model = models[model];
    this.path = path;
  }

  handleError(error) {
    logger.log('error', error.message, error);
    throw error;
  }

  async create(payload) {
    try {
      const response = await this.model.create(payload);
      logger.log('info', `Successfully created ${this.name} in database`);
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getByPk(pk) {
    try {
      const response = await this.model.findByPk(pk);
      logger.log('info', `Successfully get ${this.name} from database`);
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getOne(filter = {}) {
    try {
      const response = await this.model.findOne({ where: filter });
      logger.log('info', `Successfully get ${this.name}/s from database`);
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async createIfNotFound(filter = {}, payload = {}) {
    try {
      const [response, created] = await this.model.findOrCreate({
        where: filter,
        defaults: payload,
      });
      const action = created ? 'created' : 'get';
      logger.log('info', `Successfully ${action} ${this.name}`);
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async list(filter = {}) {
    try {
      const response = await this.model.findAll({ where: filter });
      logger.log('info', `Successfully get ${this.name}s from database`);
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async update(id, payload) {
    try {
      const response = await this.model.update(payload, {
        where: { id: id },
      });
      logger.log('info', `Successfully updated ${this.name}/s in database`);
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
};
