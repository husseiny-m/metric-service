const HTTPStatus = require('http-status');

const { addMetric, getMetricSum, getMetric } = require('../models/Metric');

exports.addMetric = async (req, res) => {
  const { key } = req.params;
  const { value } = req.body;

  addMetric(key, value);
  return res.status(HTTPStatus.OK).json({});
};

exports.getMetricSum = async (req, res) => {
  const { key } = req.params;

  const value = getMetricSum(key);
  return res.status(HTTPStatus.OK).json({ value });
};

exports.getMetric = async (req, res) => {
  const { key } = req.params;
  const metric = getMetric(key);
  return res.status(HTTPStatus.OK).json(metric);
};
