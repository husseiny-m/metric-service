const moment = require('moment');

const { addMetric, getMetricSum, getMetric } = require('../../models/Metric');
const dataStore = require('../../data/DataStore');
const helper = require('../../helpers/helper');

jest.mock('../../app.config', () => ({
  MetricMaxLifeTimeMinutes: 60
}));
jest.mock('../../helpers/helper');

describe(`Metric Model`, () => {
  afterEach(async () => {
    helper.constructMetric.mockClear();
    dataStore.remove('test-key');
  });

  describe(`addMetric`, () => {
    it('should add metric successfully ', () => {
      helper.constructMetric.mockReturnValue({
        value: 100,
        createdAt: moment()
      });

      addMetric('test-key', 100);
      const addedMetric = dataStore.get('test-key');
      expect(addedMetric.length).toEqual(1);
      expect(addedMetric[0].value).toEqual(100);
    });

    it('should call constructMetric from helper ', () => {
      helper.constructMetric.mockReturnValue({
        value: 100,
        createdAt: moment()
      });

      addMetric('test-key', 100);
      expect(helper.constructMetric).toHaveBeenCalled();
    });
  });

  describe(`getMetricSum`, () => {
    it('should get metric sum successfully ', () => {
      helper.getMetricLifetimeInMinutes.mockReturnValue(1);

      dataStore.add('test-key', {
        value: 100,
        createdAt: moment()
      });
      dataStore.add('test-key', {
        value: 300,
        createdAt: moment()
      });

      expect(getMetricSum('test-key')).toEqual(400);
    });

    it('should get metric sum of 2 metrics only because the third is outdated ', () => {
      helper.getMetricLifetimeInMinutes.mockReturnValueOnce(1); // first call
      helper.getMetricLifetimeInMinutes.mockReturnValueOnce(1); // second call
      helper.getMetricLifetimeInMinutes.mockReturnValue(90); // third call

      dataStore.add('test-key', {
        value: 100,
        createdAt: moment()
      });
      dataStore.add('test-key', {
        value: 500,
        createdAt: moment()
      });

      // the third metric outdated metric, should be neglected.
      dataStore.add('test-key', {
        value: 300,
        createdAt: moment()
      });

      expect(getMetricSum('test-key')).toEqual(600);
    });

    it('should call getMetricLifetimeInMinutes from helper ', () => {
      helper.getMetricLifetimeInMinutes.mockReturnValue(1);

      getMetricSum('test-key');
      expect(helper.getMetricLifetimeInMinutes).toHaveBeenCalled();
    });
  });

  describe(`getMetric`, () => {
    it('should get metric successfully ', () => {
      dataStore.add('test-key', {
        value: 100,
        createdAt: moment()
      });
      dataStore.add('test-key', {
        value: 300,
        createdAt: moment()
      });

      expect(getMetric('test-key').length).toEqual(2);
    });
  });
});
