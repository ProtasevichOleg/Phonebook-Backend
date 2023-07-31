const Joi = require("joi");
const { EMAIL_REGEX } = require("../helpers");

const addContactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().pattern(EMAIL_REGEX).required(),
  phone: Joi.string().min(10).max(15).required(),
  favorite: Joi.boolean().required(),
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
