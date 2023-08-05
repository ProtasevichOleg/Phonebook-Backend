const {
  register,
  verifyEmail,
  resendVerifyEmail,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
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
  verifyEmail,
  resendVerifyEmail,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
};
