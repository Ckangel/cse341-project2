const Joi = require("joi");

const validate = (schema) => (req, res, next) => {
  const toValidate = {};
  if (req.body) toValidate.body = req.body;
  if (req.params) toValidate.params = req.params;
  if (req.query) toValidate.query = req.query;

  const { error } = schema.validate(toValidate, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  });
  if (error) {
    return res.status(400).json({
      message: "Validation error",
      details: error.details.map((d) => d.message),
    });
  }
  next();
};

module.exports = validate;
