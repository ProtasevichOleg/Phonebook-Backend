const { HttpError } = require("../helpers");
const {
  listContactsOperation,
  getContactByIdOperation,
  removeContactByIdOperation,
  addContactOperation,
  updateContactOperation,
} = require("../operations");

const listContacts = async (req, res, next) => {
  try {
    const contacts = await listContactsOperation(req);
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const contact = await getContactByIdOperation(
      req.user._id,
      req.params.contactId
    );
    if (!contact) {
      throw new HttpError(404);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const removeContactById = async (req, res, next) => {
  try {
    const deleted = await removeContactByIdOperation(
      req.user._id,
      req.params.contactId
    );
    if (!deleted) {
      throw new HttpError(404);
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const newContact = await addContactOperation({
      ...req.body,
      owner: req.user._id,
    });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  try {
    const updatedContact = await updateContactOperation(
      req.user._id,
      req.params.contactId,
      req.body
    );
    if (!updatedContact) {
      throw new HttpError(404);
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const updateFavoriteStatusById = async (req, res, next) => {
  try {
    const updatedContact = await updateContactOperation(
      req.user._id,
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

module.exports = {
  listContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContactById,
  updateFavoriteStatusById,
};
