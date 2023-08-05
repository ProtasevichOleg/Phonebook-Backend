const {
  addContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} = require("./contactSchemas");
const {
  registerSchema,
  resendVerificationSchema,
  loginSchema,
} = require("./userSchemas");

module.exports = {
  addContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
  registerSchema,
  resendVerificationSchema,
  loginSchema,
};
