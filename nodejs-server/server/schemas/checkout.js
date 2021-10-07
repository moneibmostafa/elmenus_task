const Joi = require('joi');
const validateRequest = require('./validateRequest');

function checkoutCreateRequestSchema(req, res, next) {
  const item = Joi.string().guid();
  const orderCreate = Joi.object({
    user_id: Joi.string().guid().required(),
    cart: Joi.array().min(1).items(item).required(),
  });
  validateRequest(req, res, next, orderCreate);
}

module.exports = {
  checkoutCreateRequestSchema,
};
