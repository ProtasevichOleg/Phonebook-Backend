const Joi = require("joi");
const { EMAIL_REGEX } = require("../helpers");

const registerSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(EMAIL_REGEX).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter"),
});

const resendVerificationSchema = Joi.object({
  email: Joi.string().pattern(EMAIL_REGEX).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(EMAIL_REGEX).required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  registerSchema,
  resendVerificationSchema,
  loginSchema,
};
