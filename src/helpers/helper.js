const moment = require('moment');

function constructMetric(value) {
  return { value: Math.round(value), createdAt: moment() };
}

function getMetricLifetimeInMinutes(metricTimeString) {
  return moment().diff(metricTimeString, 'minutes');
}

module.exports = {
  constructMetric,
  getMetricLifetimeInMinutes
};
