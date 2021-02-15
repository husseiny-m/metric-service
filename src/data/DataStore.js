const { MetricMaxLifeTimeMinutes } = require('../app.config');
const helper = require('../helpers/helper');
class DataStore {
  constructor() {
    if (!DataStore.instance) {
      this._data = {};
      DataStore.instance = this;
    }

    return DataStore.instance;
  }

  add(key, value) {
    if (!this._data[key]) {
      this._data[key] = [];
    }
    this._data[key].push(value);
  }

  get(key) {
    return this._data[key] || [];
  }

  removeOutdatedMetrics() {
    for (const key in this._data) {
      this._data[key] = this._data[key].filter(metric => {
        const minutes = helper.getMetricLifetimeInMinutes(metric.createdAt);
        return minutes <= MetricMaxLifeTimeMinutes;
      });
    }
  }
}

const instance = new DataStore();
Object.freeze(instance);

module.exports = instance;
