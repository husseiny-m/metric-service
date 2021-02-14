const HTTPStatus = require('http-status');

exports.getMetricSum = async (req, res) => {
  const result = {};
  return res.status(HTTPStatus.OK).json(result);
};
