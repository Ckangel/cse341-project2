const Joi = require("joi");

const gardenSchema = Joi.object({
  name: Joi.string().required(),
  layout: Joi.string().required(),
  plantTypes: Joi.array().items(Joi.string()).min(1).required(),
  wateringSchedule: Joi.string().required(),
  sunlightNeeds: Joi.string().required(),
  soilType: Joi.string().required(),
  notes: Joi.string().allow(""),
});

module.exports = (req, res, next) => {
  const { error } = gardenSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
