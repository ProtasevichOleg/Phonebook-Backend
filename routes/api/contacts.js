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
  ctrlWrapper,
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
router.get(
  "/",
  authenticate,
  ctrlWrapper(listContacts)
);

router.get(
  "/:contactId",
  authenticate,
  verifyContactExists,
  ctrlWrapper(getContactById)
);

router.delete(
  "/:contactId",
  authenticate,
  verifyContactExists,
  ctrlWrapper(removeContactById)
);

router.post(
  "/",
  authenticate,
  validate(addContactSchema),
  ctrlWrapper(addContact)
);

router.put(
  "/:contactId",
  authenticate,
  verifyContactExists,
  validate(updateContactSchema),
  ctrlWrapper(updateContactById)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  verifyContactExists,
  validate(updateFavoriteSchema),
  ctrlWrapper(updateFavoriteStatusById)
);

module.exports = router;
