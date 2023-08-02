const {
  register,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
} = require("./authController");
const {
  listContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContactById,
  updateFavoriteStatusById,
} = require("./contactsController");

module.exports = {
  listContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContactById,
  updateFavoriteStatusById,
  register,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
};
