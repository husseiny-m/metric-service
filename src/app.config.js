require('dotenv').config({ path: 'variables.env' });

module.exports = {
  Port: process.env.PORT || 7777,
  MetricMaxLifeTimeMinutes: +process.env.METRIC_MAX_LIFETIME_MINUTES || 60,
  CronExpressionOutdatedMetrics:
    process.env.CRON_EXPRESSION_OUTDATED_METRICS || '* * * * *'
};
