const Joi = require("joi");
const { EMAIL_REGEX, PHONE_REGEX } = require("../helpers");

const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().pattern(EMAIL_REGEX).required(),
  phone: Joi.string().min(10).max(15).pattern(PHONE_REGEX).required(),
  favorite: Joi.boolean().optional(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(3).optional(),
  email: Joi.string().pattern(EMAIL_REGEX).optional(),
  phone: Joi.string().min(10).max(15).optional(),
  favorite: Joi.boolean().optional(),
}).or("name", "email", "phone");

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  addContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
};
