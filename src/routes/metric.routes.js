const express = require('express');
const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');
const { keySchema, valueSchema } = require('../validation/schemas');
const { validate } = require('../validation/middleware');
const {
  addMetric,
  getMetricSum,
  getMetric
} = require('../controllers/metricController');

router.post(
  '/:key',
  validate(keySchema, 'params'),
  validate(valueSchema, 'body'),
  catchErrors(addMetric)
);

router.get(
  '/:key/sum',
  validate(keySchema, 'params'),
  catchErrors(getMetricSum)
);

router.get('/:key', validate(keySchema, 'params'), catchErrors(getMetric));

module.exports = router;
