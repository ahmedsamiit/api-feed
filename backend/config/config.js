const Joi = require('joi');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Define the schema
const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number()
    .port()
    .default(8080),
  MONGO_URI: Joi.string()
    .trim()
    .uri({ scheme: ['mongodb', 'mongodb+srv'] })
    .required()
}).unknown(true); // Allow system/env variables we do not manage.

// Validate the environment variables
const { error, value: envVars } = envSchema.validate(process.env, {
  abortEarly: false
});

if (error) {
  const messages = error.details.map((detail) => detail.message).join(', ');
  throw new Error(`Config validation error: ${messages}`);
}

// Export the validated and normalized environment variables
module.exports = {
  nodeEnv: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoUri: envVars.MONGO_URI
};
