const { HttpError } = require("../helpers");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavoriteStatus,
} = require("../operations");

const getContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (!contact) {
      throw new HttpError(404);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  console.log("1");
  try {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  try {
    const updatedContact = await updateContact(req.params.contactId, req.body);
    if (!updatedContact) {
      throw new HttpError(404, "Not Found");
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const updateFavoriteStatusById = async (req, res, next) => {
  try {
    const updatedContact = await updateFavoriteStatus(
      req.params.contactId,
      req.body
    );
    if (!updatedContact) {
      throw new HttpError(404, "Not Found");
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const deleted = await removeContact(req.params.contactId);
    if (!deleted) {
      throw new HttpError(404);
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContactById,
  updateFavoriteStatusById,
  deleteContact,
};
