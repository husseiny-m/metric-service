const dataStore = require('../data/DataStore');
const { MetricMaxLifeTimeMinutes } = require('../app.config');
const helper = require('../helpers/helper');

function getMetricSum(key) {
  const metricItems = dataStore.get(key);

  return metricItems.reduce((accumulator, metric) => {
    const minutes = helper.getMetricLifetimeInMinutes(metric.createdAt);

    return minutes <= MetricMaxLifeTimeMinutes
      ? accumulator + metric.value
      : accumulator;
  }, 0);
}

function addMetric(key, value) {
  const metric = helper.constructMetric(value);
  dataStore.add(key, metric);
}

function getMetric(key) {
  return dataStore.get(key);
}

module.exports = { getMetricSum, addMetric, getMetric };
