require('dotenv').config({path:'/home/crio-user/workspace/harsh-v26-ME_BUILDOUT_XFLIX_NODE/.env'});
const Joi = require('joi');

const envSchema = Joi.object().keys({
    NODE_ENV: Joi.string()
    .valid('test', 'development','production')
    .required(),

    NODE_ENV22: Joi.number().default(8082),
    MONGODB_URL: Joi.string()
}).unknown();
 
// const {error, envVars} = envSchema.validate(process.env);
const {value: envVars, error } = envSchema.validate(process.env);



if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }


 


module.exports = {
    PORT1: envVars.NODE_ENV22, 
    NODE_ENV:envVars.NODE_ENV,
    MONGODB_URL: envVars.MONGODB_URL,
}