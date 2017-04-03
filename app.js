const express = require('express');
const bodyParser = require('body-parser');

const HttpStatus = require('http-status-codes');
const config = require('./lib/utils/config');
const router = require('./lib/routes');

const app = express();

// Todo: Setup templating engine (handlebars) @Fran

// Static directory
app.use(express.static('static'));

app.use(bodyParser.json());

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
