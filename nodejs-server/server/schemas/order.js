const Joi = require('joi');
const validateRequest = require('./validateRequest');

function orderCreateRequestSchema(req, res, next) {
  const item = Joi.object({
    itemID: Joi.string().guid(),
    count: Joi.number().integer().min(1).max(100),
  });
  const orderCreate = Joi.object({
    userID: Joi.string().guid().required(),
    cart: Joi.array().min(1).items(item).required(),
    paymentInfo: Joi.object({
      token: Joi.string().required(),
      currency: Joi.string().required(),
    }).required(),
  });
  validateRequest(req, res, next, orderCreate);
}

module.exports = {
  orderCreateRequestSchema,
};
