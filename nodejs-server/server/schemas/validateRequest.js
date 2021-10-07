const errors = require('../../errors/errors');

module.exports = function validateRequest(req, res, next, schema) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  req.body = value;
  if (error) {
    throw new errors.UnprocessableEntity(
      error.details.map((x) => x.message).join(', ')
    );
  }
  return next();
};
