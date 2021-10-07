const Joi = require('joi');
const validateRequest = require('./validateRequest');

function itemCreateRequestSchema(req, res, next) {
  const itemCreate = Joi.object({
    name: Joi.string().min(2).max(200).required(),
    price: Joi.number().min(1).max(1500).required(),
    availabilityCount: Joi.number().integer().min(1).max(100).required(),
  });
  validateRequest(req, res, next, itemCreate);
}

function itemUpdateRequestSchema(req, res, next) {
  const itemUpdate = Joi.object({
    price: Joi.number().min(1).max(1500),
    availabilityCount: Joi.number().integer().min(0).max(100),
  });
  validateRequest(req, res, next, itemUpdate);
}

module.exports = {
  itemCreateRequestSchema,
  itemUpdateRequestSchema,
};
