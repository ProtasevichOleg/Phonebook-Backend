const { ContactModel } = require("../models");

const listContactsOperation = async (req) => {
  const userId = req.user._id;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  const filter = { owner: userId };
  if (favorite !== undefined) filter.favorite = favorite === "true";

  const result = await ContactModel.find(filter, "-createdAt -updatedAt", {
    skip,
    limit,
  }).select("-owner");
  return result;
};

const getContactByIdOperation = async (userId, contactId) =>
  await ContactModel.findOne({ _id: contactId, owner: userId }).select(
    "-owner -createdAt -updatedAt"
  );

const removeContactByIdOperation = async (userId, contactId) =>
  await ContactModel.findOneAndDelete({ _id: contactId, owner: userId });

const addContactOperation = async (body) => {
  const newContact = await ContactModel.create(body);
  return ContactModel.findById(newContact._id).select(
    "-owner -createdAt -updatedAt"
  );
};

const updateContactOperation = async (userId, contactId, body) =>
  await ContactModel.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { $set: body },
    { new: true }
  ).select("-owner -createdAt -updatedAt");

module.exports = {
  listContactsOperation,
  getContactByIdOperation,
  removeContactByIdOperation,
  addContactOperation,
  updateContactOperation,
};
