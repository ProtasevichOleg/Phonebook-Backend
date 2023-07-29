const express = require("express");
const { schemas, contactOperations } = require("../../models");
const { listContacts, getContactById, removeContact } = contactOperations;
const { addContact, updateContact, updateFavoriteStatus } = contactOperations;
const { addContactSchema, updateContactSchema, updateFavoriteSchema } = schemas;

const router = express.Router();
const { HttpError, validate, verifyContactExists } = require("../../helpers");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", verifyContactExists, async (req, res, next) => {
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
  verifyContactExists,
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

router.patch(
  "/:contactId/favorite",
  verifyContactExists,
  validate(updateFavoriteSchema, "body"),
  async (req, res, next) => {
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
  }
);

router.delete("/:contactId", verifyContactExists, async (req, res, next) => {
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
