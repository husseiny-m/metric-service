const cron = require('node-cron');
const { CronExpressionOutdatedMetrics } = require('../app.config');

const dataStore = require('../data/DataStore');

exports.removeOutdatedMetrics = () => {
  cron.schedule(CronExpressionOutdatedMetrics, () => {
    dataStore.removeOutdatedMetrics();
  });
};
