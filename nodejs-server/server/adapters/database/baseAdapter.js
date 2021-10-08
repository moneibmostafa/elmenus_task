const { logger } = require('../../../logger');
const models = require('../../../models');

module.exports = class BaseAdapter {
  constructor({ name, model }) {
    this.name = name;
    this.model = models[model];
  }

  async create(payload) {
    const response = await this.model.create(payload);
    logger.log('info', `Successfully created ${this.name} in database`);
    return response;
  }

  async getByPk(pk) {
    const response = await this.model.findByPk(pk);
    logger.log('info', `Successfully get ${this.name} from database`);
    return response;
  }

  async getOne(filter = {}) {
    const response = await this.model.findOne({ where: filter });
    logger.log('info', `Successfully get ${this.name}/s from database`);
    return response;
  }

  async createIfNotFound(filter = {}, payload = {}) {
    const [response, created] = await this.model.findOrCreate({
      where: filter,
      defaults: payload,
    });
    const action = created ? 'created' : 'get';
    logger.log('info', `Successfully ${action} ${this.name}`);
    return response;
  }

  async list(filter = {}) {
    const response = await this.model.findAll({ where: filter });
    logger.log('info', `Successfully get ${this.name}s from database`);
    return response;
  }

  async update(id, payload) {
    const response = await this.model.update(payload, {
      where: { id: id },
    });
    logger.log('info', `Successfully updated ${this.name}/s in database`);
    return response;
  }
};
