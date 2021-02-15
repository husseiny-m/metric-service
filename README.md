# Metric Service

This is a small memory based metric logging and reporting service that sums metrics by time window for the most recent hour.

All values will be rounded to the nearest integer e.g. *10.5 will be 11 and 10.2 will be 10*.

Any reported data after it is more than an hour old will be removed, since we only care about data in the most recent hour.

## APIs

### POST metric

Request

```bash
POST /metric/{key}
{
  "value": 30
}
```

Response (200)

```bash
{}
```

### GET metric sum

Returns the sum of all metrics reported for this key over the past hour

Request

```bash
GET /metric/{key}/sum
```

Response (200)

```bash
{
  "value": 400
}
```

## Example

Imagine these are the events logged to your service for a metric "active_visitors":

```bash

// 2 hours ago **
POST /metric/active_visitors { "value" = 4 }

// 30 minutes ago
POST /metric/active_visitors { "value" = 3 }

// 40 seconds ago
POST /metric/active_visitors { "value" = 7 }

// 5 seconds ago
POST /metric/active_visitors { "value" = 2 }

```

These are the results expected from calling get aggregates:

```bash
GET /metric/active_visitors/sum // returns 12
```

*Note that the metric posted 2 hours ago is not included in the sum since we only care about
data in the most recent hour for these APIs.*

## Install

Create a variables.env at root and add the following:

```bash
NODE_ENV=development

PORT=[Whatever port you prefer] default: 7777

# Time window in minutes after it, Metrics will be outdated, here configured to 60 minutes(1 hour)
METRIC_MAX_LIFETIME_MINUTES=60

# A cron expression used by a cron job to remove outdated metrics, here configured to run Every minute.
CRON_EXPRESSION_OUTDATED_METRICS=* * * * *

```

then

```bash
    npm install
```

## Run

```bash
    npm start
```

## Run Tests

```bash
    npm test
```

## Main Tech/Tools

- [Express](https://expressjs.com/) node.js framework.

- [joi](https://www.npmjs.com/package/joi) for validation.

- [jest](https://jestjs.io/) for unit testing.

- [node-cron](https://www.npmjs.com/package/node-cron) as a tiny task scheduler

- [heroku](https://www.heroku.com/) for deployment.

- [eslint](https://eslint.org/) for linting.

- [prettier](https://prettier.io/) for code formatting.

## Deployment

- Deployed **live** at heroku: <https://metric-service-api.herokuapp.com>

  - Add Metric:

    ```bash
    POST /api/v1/metric/active_visitors { "value" = 4 }
    ```

  - Get Metric Sum:

    ```bash
    GET /ap/v1/metric/active_visitors/sum
    ```
