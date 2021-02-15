const cron = require('node-cron');
const { CronExpressionOutdatedMetrics } = require('../app.config');

const dataStore = require('../data/DataStore');

exports.removeOutdatedMetrics = () => {
  cron.schedule(CronExpressionOutdatedMetrics, () => {
    console.log('remove outdated metrics');
    dataStore.removeOutdatedMetrics();
  });
};
