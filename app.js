const express = require('express');
const HttpStatus = require('http-status-codes');
const path = require('path');
const config = require('./lib/utils/config')();
const { httpLogger, logger } = require('./lib/utils/loggers');
const router = require('./lib/routes');

const app = express();
app.set('env', config.env);

// Logging - to stdout in development, to files in production
app.use(httpLogger);

// Templating engine
app.set('view engine', 'pug');

// Static directory
app.use(express.static(path.join(__dirname, 'static')));

app.use(router);

if (app.get('env') === 'production') {
  // @see https://expressjs.com/en/advanced/best-practice-performance.html#in-code
  // Compress everything
  const compression = require('compression');
  app.use(compression());

  // Error handling: Send less explicit errors in production
  app.use((err, req, res, next) => {
    const status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const explicitDescription = err.description || err.message || 'Unknown Error';
    let description;
    switch (status) {
      case HttpStatus.NOT_FOUND:
        description = 'Not found!';
        break;
      case HttpStatus.BAD_REQUEST:
        description = 'Bad Request!';
        break;
      case HttpStatus.FORBIDDEN:
        description = 'Not authenticated!';
        break;
      default:
        description = 'Server Error :/';
    }
    logger.error(`ERROR CODE ${status}: ${explicitDescription}`);

    // Pass less descriptive error along in the locals
    res.locals.errorCode = errorCode;
    res.locals.errorDescription = description;
    next();
  });
} else {
  // Development

  // Error handling: Send more explicit errors
  app.use((err, req, res, next) => {
    const description = err.description || err.message || 'Unknown Error';
    const status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
    logger.error(`ERROR CODE ${status}: ${description}`);

    // Pass error along
    res.locals.errorCode = errorCode; // eslint-disable-line
    res.locals.errorDescription = description; // eslint-disable-line
    next();
  });
}


app.use((req, res) => {
  // if coming from the above error handler, error code will be set in locals
  // Otherwise it's a not found error
  const errorCode = res.locals.errorCode || HttpStatus.NOT_FOUND;
  const errorDescription = res.locals.errorDescription || 'Not Found!';
  res.status(errorCode);

  // respond with html page
  if (req.accepts('html')) {
    res.render('error', {title: 'Error', errorCode, errorDescription});
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({errorDescription});
    return;
  }

  // default to plain-text. send()
  res.type('txt').send(errorDescription);
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
