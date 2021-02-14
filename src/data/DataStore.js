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
    return this._data[key];
  }
}

const instance = new DataStore();
Object.freeze(instance);

module.exports = instance;
