const {
  addContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} = require("./contactSchemas");
const { registerSchema, loginSchema } = require("./userSchemas");

module.exports = {
  addContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
  registerSchema,
  loginSchema,
};
