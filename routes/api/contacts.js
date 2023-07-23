const express = require("express");
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const router = express.Router();

const { HttpError, validate } = require("../../helpers");

const addContactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(15).required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(3).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().min(10).max(15).optional(),
}).or("name", "email", "phone");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (!contact) {
      throw new HttpError(404);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", validate(addContactSchema, "body"), async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:contactId",
  validate(updateContactSchema, "body"),
  async (req, res, next) => {
    try {
      const updatedContact = await updateContact(
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
  }
);

router.delete("/:contactId", async (req, res, next) => {
  try {
    const deleted = await removeContact(req.params.contactId);
    if (!deleted) {
      throw new HttpError(404);
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
