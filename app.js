require('dotenv').config({ path: './keys.private.env' }); // Setup environment
const express = require('express');
const HttpStatus = require('http-status-codes');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const auth = require('./lib/auth');
const config = require('./lib/utils/config');
const { httpLogger, logger } = require('./lib/utils/loggers');
const mongoSetup = require('./lib/utils/mongo');
const router = require('./lib/routes');

const app = express();
app.set('env', config.env);
// Templating engine
app.set('view engine', 'pug');

// Logging - to stdout in development, to files in production
app.use(httpLogger);

app.use(cors());
// Static directory
// The dist directory is where webpack builds to
app.use(express.static(path.join(__dirname, 'dist')));

// Passport + session setup
if (app.get('env') === 'production') {
  const MongoStore = require('connect-mongo')(session);
// Session setup
  app.use(session({
    secret: config.session.secret,
    store: new MongoStore(mongoSetup.storeOptions),
    saveUninitialized: true,
    resave: false
  }));
} else {
  // Session setup
  // Dev store doesn't need persistence
  app.use(session({
    secret: config.session.secret,
    saveUninitialized: true,
    resave: false
  }));
}

const { strategy, deserializeUser, serializeUser } = auth;
passport.use(strategy);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
app.use(passport.initialize());
app.use(passport.session());

// Route setup
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
    res.locals.errorCode = status;
    res.locals.errorDescription = description;
    next();
  });
} else {
  // Development
  // Watches for file changes
  const webpack = require('webpack'); // eslint-disable-line
  const wpConfig = require('./webpack.config');
  wpConfig.watch = true;
  wpConfig.watchOptions = {
    aggregateTimeout: 500,
    poll: 500
  };

  webpack(wpConfig, (err, stats) => {
    if (err) {
      logger.error(`Webpack build error: ${err.stack || err}`);
    } else {
      logger.info('Rebuilt bundles.');
      const statsInfo = stats.toJson();
      if (stats.hasErrors()) {
        logger.error(`Webpack build errors: ${statsInfo.errors}`);
      }
      if (stats.hasWarnings()) {
        logger.error(`Webpack build warnings: ${statsInfo.warnings}`);
      }
      logger.info(`Build took: ${statsInfo.time}ms`);
    }
  });

  // Error handling: Send more explicit errors
  app.use((err, req, res, next) => {
    const description = err.description || err.message || 'Unknown Error';
    const status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
    logger.error(`ERROR CODE ${status}: ${description}`);

    // Pass error along
    res.locals.errorCode = status;
    res.locals.errorDescription = description;
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
    res.render('error', { title: 'Error', errorCode, errorDescription });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.json({ errorDescription });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send(errorDescription);
});

function start() {
  // Databse setup
  mongoSetup();

  app.listen(config.port, () => {
    logger.info(`${config.name} is listening on port ${config.port}`);
  });
}

// If run directly
if (require.main === module) {
  start();
}

// Exported for testing
module.exports = app;
module.exports.start = start;
