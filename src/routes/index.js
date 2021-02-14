const metricRoutes = require('./metric.routes');

module.exports = app => {
  app.use('/api/v1/metric', metricRoutes);
};
