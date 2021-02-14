const moment = require('moment');
const dataStore = require('../data/DataStore');

function getMetricSum(key) {
  const metricValues = dataStore.get(key);
  metricValues.filter(metric => {
    return moment().diff(metric.createdAt, 'minutes') <= 60;
  });
  return dataStore.get(key);
}

function AddMetric(key, value) {
  const metricItem = { value, createdAt: moment() };
  dataStore.add(key, metricItem);
}
module.exports = { getMetricSum, AddMetric };
