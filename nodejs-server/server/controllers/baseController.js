const { uuid } = require('uuidv4');
const { logger } = require('../../logger');
const errors = require('../../errors/errors');

module.exports = class BaseController {
  constructor({ primaryKey, adapter, validator = undefined, name }) {
    this.primaryKey = primaryKey;
    this.adapter = adapter;
    this.validator = validator;
    this.name = name;
  }

  handleError(error) {
    logger.log('error', error.message, error);
    throw error;
  }

  convertToSingleForm(response) {
    if (!response) return undefined;
    return response instanceof Array ? response[0] : response;
  }

  async create(payload) {
    try {
      const body = { [this.primaryKey]: uuid(), ...payload };
      const response = await this.adapter.create(body);
      return this.convertToSingleForm(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getByPk(pk) {
    try {
      const response = await this.adapter.getByPk(pk);
      if (!response) throw new errors.NotFound(`${this.name} not found`);
      return this.convertToSingleForm(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getOne(query) {
    try {
      const response = await this.adapter.getOne(query);
      return this.convertToSingleForm(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async list(query) {
    try {
      const response = await this.adapter.list(query);
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async update(id, payload) {
    try {
      const response = await this.adapter.update(id, payload);
      return this.convertToSingleForm(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async delete(payload) {
    try {
      const response = await this.adapter.get(payload);
      return this.convertToSingleForm(response);
    } catch (error) {
      return this.handleError(error);
    }
  }
};
