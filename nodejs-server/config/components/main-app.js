const joi = require('joi');

const envVarsSchema = joi
  .object({
    PORT: joi.number().required(),
    SERVER_NAME: joi.string().required(),
    MIN_ACCEPTABLE_PAYMENT: joi.number().required(),
    MAX_ACCEPTABLE_PAYMENT: joi.number().required(),
  })
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  serverName: envVars.SERVER_NAME,
  port: envVars.PORT,
  minAcceptablePayment: envVars.MIN_ACCEPTABLE_PAYMENT,
  maxAcceptablePayment: envVars.MAX_ACCEPTABLE_PAYMENT,
};

module.exports = config;
