
/**
 * Created by austin on 4/3/17.
 */

const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');

router.get('/api/schedules', (req, res) => {
  // Todo: Get all of a user’s schedules
});

router.post('/api/schedules', (req, res) => {
  // Todo: Create a new Schedule and save it to database
});

module.exports = router;