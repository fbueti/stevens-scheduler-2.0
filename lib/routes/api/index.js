/**
 * Created by austin on 3/3/17.
 */
const reqDir = require('require-dir');
const router = require('express').Router();
const bodyParser = require('body-parser');

// Database API level bodyparser middleware
// Not needed for website serving
router.use(bodyParser.json());

const routes = reqDir('.');

// Cycle through all the routes and add them to the main app router
for (const key of Object.keys(routes)) {
  router.use(routes[key]);
}

module.exports = router;
