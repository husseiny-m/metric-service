const HTTPStatus = require('http-status');

exports.validate = (schema, property) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req[property]);
      next();
    } catch (error) {
      res.status(HTTPStatus.BAD_REQUEST).send(error);
    }
  };
};
