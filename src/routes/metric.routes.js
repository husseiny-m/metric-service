const express = require('express');
const router = express.Router();
const metricController = require('../controllers/metricController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(metricController.getMetricSum));

module.exports = router;
