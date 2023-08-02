const ctrlWrapper = require("./ctrlWrapper");
const validate = require("./validate");
const {
  verifyValidContactId,
  verifyContactExists,
} = require("./verifyContact");
const authenticate = require("./authenticate");

module.exports = {
  ctrlWrapper,
  validate,
  verifyContactExists,
  verifyValidContactId,
  authenticate,
};
