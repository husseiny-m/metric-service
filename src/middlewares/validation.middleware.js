const HTTPStatus = require('http-status');
const Joi = require('joi');

exports.validateMetricKey = async (req, res, next) => {
  try {
    const paramsSchema = Joi.object({
      key: Joi.string().required()
    });
    await paramsSchema.validateAsync(req.params);
    next();
  } catch (error) {
    res.status(HTTPStatus.BAD_REQUEST).send(error);
  }
};

exports.validateMetricValue = async (req, res, next) => {
  try {
    const bodySchema = Joi.object({
      value: Joi.number().required()
    });
    await bodySchema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(HTTPStatus.BAD_REQUEST).send(error);
  }
};
