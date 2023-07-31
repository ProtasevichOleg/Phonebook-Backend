const mongoose = require("mongoose");
const { HttpError } = require("../helpers");

const verifyValidContactId = (req, res, next) => {
  const { contactId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return next(new HttpError(400, "Invalid ID format"));
  }
  next();
};

const verifyContactExists = async (req, res, next) => {
  verifyValidContactId(req, res, async (err) => {
    if (err) {
      return next(err);
    }

    const { contactId } = req.params;
    try {
      const ContactModel = mongoose.model("contact");
      const contactExists = await ContactModel.findById(contactId);
      if (!contactExists) {
        return next(new HttpError(404, "Contact not found"));
      }
      next();
    } catch (error) {
      next(error);
    }
  });
};

module.exports = { verifyValidContactId, verifyContactExists };
