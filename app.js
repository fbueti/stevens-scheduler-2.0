const express = require('express');
const HttpStatus = require('http-status-codes');
const path = require('path');
const config = require('./lib/utils/config')();
const loggers = require('./lib/utils/loggers');
const router = require('./lib/routes');

const app = express();
app.set('env', config.env);

// Logging - to stdout in development, to files in production
app.use(loggers.httpLogger);

// Templating engine
app.set('view engine', 'pug');

// Static directory
app.use(express.static(path.join(__dirname, 'static')));

app.use(router);

// Error handling
app.use((err, req, res, next) => {
  const description = err.description || err.message || 'Unknown Error';
  const status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
  // logger.error(`ERROR CODE ${status}: ${description}`);
  res.status(status).send({description});
});


function start() {
  app.listen(config.port, () => {
    console.log(`${config.name} is listening on port ${config.port}`);
  });
}

// If run directly
if (require.main === module) {
  start();
}

// Exported for testing
module.exports = app;
module.exports.start = start;
