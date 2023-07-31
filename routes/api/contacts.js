const express = require("express");
const { addContactSchema, updateContactSchema, updateFavoriteSchema } =
require("../../schemas");
const { validate, verifyContactExists, ctrlWrapper } = require("../../middlewares");
const {
  getContacts,
  getContact,
  createContact,
  updateContactById,
  updateFavoriteStatusById,
  deleteContact,
} = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(getContacts));

router.get("/:contactId", verifyContactExists, ctrlWrapper(getContact));

router.post("/", validate(addContactSchema), ctrlWrapper(createContact));

router.put(
  "/:contactId",
  verifyContactExists,
  validate(updateContactSchema),
  ctrlWrapper(updateContactById)
);

router.patch(
  "/:contactId/favorite",
  verifyContactExists,
  validate(updateFavoriteSchema),
  ctrlWrapper(updateFavoriteStatusById)
);

router.delete("/:contactId", verifyContactExists, ctrlWrapper(deleteContact));

module.exports = router;
