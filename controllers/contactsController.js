const { HttpError } = require("../helpers");
const {
  listContactsOperation,
  getContactByIdOperation,
  removeContactByIdOperation,
  addContactOperation,
  updateContactOperation,
} = require("../operations");
const { ctrlWrapper } = require("../middlewares");

const listContacts = ctrlWrapper(async (req, res, next) => {
  const contacts = await listContactsOperation(req);
  res.json(contacts);
});

const getContactById = ctrlWrapper(async (req, res, next) => {
  const contact = await getContactByIdOperation(
    req.user._id,
    req.params.contactId
  );
  if (!contact) {
    throw new HttpError(404);
  }
  res.json(contact);
});

const removeContactById = ctrlWrapper(async (req, res, next) => {
  const deleted = await removeContactByIdOperation(
    req.user._id,
    req.params.contactId
  );
  if (!deleted) {
    throw new HttpError(404);
  }
  res.status(200).json({ message: "contact deleted" });
});

const addContact = ctrlWrapper(async (req, res, next) => {
  const newContact = await addContactOperation({
    ...req.body,
    owner: req.user._id,
  });
  res.status(201).json(newContact);
});

const updateContactById = ctrlWrapper(async (req, res, next) => {
  const updatedContact = await updateContactOperation(
    req.user._id,
    req.params.contactId,
    req.body
  );
  if (!updatedContact) {
    throw new HttpError(404);
  }
  res.json(updatedContact);
});

const updateFavoriteStatusById = ctrlWrapper(async (req, res, next) => {
  const updatedContact = await updateContactOperation(
    req.user._id,
    req.params.contactId,
    req.body
  );
  if (!updatedContact) {
    throw new HttpError(404, "Not Found");
  }
  res.json(updatedContact);
});

module.exports = {
  listContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContactById,
  updateFavoriteStatusById,
};
