const Joi = require('joi');

exports.valueSchema = Joi.object({
  value: Joi.number().required()
});

exports.keySchema = Joi.object({
  key: Joi.string().required()
});
