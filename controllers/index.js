const { register, login } = require("./authController");
const {
  getContacts,
  getContact,
  createContact,
  updateContactById,
  updateFavoriteStatusById,
  deleteContact,
} = require("./contactsController");

module.exports = {
  register,
  login,
  getContacts,
  getContact,
  createContact,
  updateContactById,
  updateFavoriteStatusById,
  deleteContact,
};
