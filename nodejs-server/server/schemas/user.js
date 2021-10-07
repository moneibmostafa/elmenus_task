const Joi = require('joi');
const validateRequest = require('./validateRequest');

function userCreateRequestSchema(req, res, next) {
  const userCreate = Joi.object({
    firstname: Joi.string().min(2).max(20).required(),
    lastname: Joi.string().min(2).max(20).required(),
    email: Joi.string().max(30).email().required(),
    password: Joi.string().min(8).max(12).required(),
  });
  validateRequest(req, res, next, userCreate);
}

function userUpdateRequestSchema(req, res, next) {
  const userUpdate = Joi.object({
    firstname: Joi.string().min(2).max(20),
    lastname: Joi.string().min(2).max(20),
    email: Joi.string().max(30).email(),
    password: Joi.string().min(8).max(12),
  });
  validateRequest(req, res, next, userUpdate);
}

module.exports = {
  userCreateRequestSchema,
  userUpdateRequestSchema,
};
