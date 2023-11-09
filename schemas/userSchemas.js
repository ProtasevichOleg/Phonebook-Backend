const Joi = require("joi");
const { NAME_REGEX, EMAIL_REGEX, PASSWORD_REGEX } = require("../helpers");

const registerSchema = Joi.object({
  name: Joi.string().min(6).max(20).pattern(NAME_REGEX).required(),
  email: Joi.string().pattern(EMAIL_REGEX).required(),
  password: Joi.string().min(6).pattern(PASSWORD_REGEX).required(),
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
