const express = require("express");
const {
  addContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} = require("../../schemas");
const {
  validate,
  verifyContactExists,
  authenticate,
} = require("../../middlewares");
const {
  listContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContactById,
  updateFavoriteStatusById,
} = require("../../controllers");

const router = express.Router();
router.get("/", authenticate, listContacts);

router.get("/:contactId", authenticate, verifyContactExists, getContactById);

router.delete(
  "/:contactId",
  authenticate,
  verifyContactExists,
  removeContactById
);

router.post("/", authenticate, validate(addContactSchema), addContact);

router.put(
  "/:contactId",
  authenticate,
  verifyContactExists,
  validate(updateContactSchema),
  updateContactById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  verifyContactExists,
  validate(updateFavoriteSchema),
  updateFavoriteStatusById
);

module.exports = router;
