const HttpError = require("./HttpError");

const validate = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    if (error) {
      throw new HttpError(400, error.message);
    }
    next();
  };
};

module.exports = validate;
