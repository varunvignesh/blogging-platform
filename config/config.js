// External Dependencies
const Joi = require("joi");

// Initiate dotenv fetch data from .env
require("dotenv").config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string().allow("local", "dev", "prod").required(),
    APP_PORT: Joi.number().default(8081),
    JWT_SECRET: Joi.string()
        .required()
        .description("JWT Secret required to sign"),
    DATABASE_HOST: Joi.string().required(),
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_PORT: Joi.number().default(5432),
})
    .unknown()
    .required();

// Validate .env and assign to envVars
const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    node_env: envVars.NODE_ENV,
    app_port: envVars.APP_PORT,
    jwt_secret: envVars.JWT_SECRET,
    dialect: "postgres",
    host: envVars.DATABASE_HOST,
    database: envVars.DATABASE_NAME,
    username: envVars.DATABASE_USER,
    password: envVars.DATABASE_PASSWORD,
    port: envVars.DATABASE_PORT,
};

module.exports = config;
