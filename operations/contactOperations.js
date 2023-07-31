const { ContactModel } = require("../models");

const listContacts = async () => {
  return await ContactModel.find({});
};

const getContactById = async (contactId) => {
  return await ContactModel.findById(contactId);
};

const removeContact = async (contactId) => {
  return await ContactModel.findByIdAndRemove(contactId);
};

const addContact = async (body) => {
  return await ContactModel.create(body);
};

const updateContact = async (contactId, body) => {
  return await ContactModel.findByIdAndUpdate(
    contactId,
    { $set: body },
    { new: true }
  );
};

const updateFavoriteStatus = async (contactId, body) => {
  return await ContactModel.findByIdAndUpdate(
    contactId,
    { $set: body },
    { new: true }
  );
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavoriteStatus,
};
