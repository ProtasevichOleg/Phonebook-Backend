const { HttpError } = require("../helpers");

const validate = (schema, property = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    if (error) {
      throw new HttpError(400, error.message);
    }
    next();
  };
};

module.exports = validate;
