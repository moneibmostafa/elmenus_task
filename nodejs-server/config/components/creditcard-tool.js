const joi = require('joi');

const envVarsSchema = joi
  .object({
    STRIPE_PUBLISHABLE_KEY: joi.string().required(),
    STRIPE_SECRET_KEY: joi.string().required(),
  })
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  stripePublicKey: envVars.STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey: envVars.STRIPE_SECRET_KEY,
};

module.exports = config;
