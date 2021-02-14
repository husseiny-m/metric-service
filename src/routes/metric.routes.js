const express = require('express');
const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');
const {
  validateMetricKey,
  validateMetricValue
} = require('../middlewares/validation.middleware');
const {
  addMetric,
  getMetricSum,
  getMetric
} = require('../controllers/metricController');

router.post(
  '/:key',
  validateMetricKey,
  validateMetricValue,
  catchErrors(addMetric)
);

router.get('/:key/sum', validateMetricKey, catchErrors(getMetricSum));

router.get('/:key', validateMetricKey, catchErrors(getMetric));

module.exports = router;
