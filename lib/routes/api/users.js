/**
 * Created by austin on 4/10/17.
 */

const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');
const User = require('../../models/user');

router.delete('/users/:googleUuid',
    require('connect-ensure-login').ensureLoggedIn(),
    (req, res) => {
  // Todo: Delete a user by their Google UUID
  // Data for user should be in req.user
  // Return a response with status HttpStatus.NO_CONTENT if successful
  req.body.user.remove().then(() => {
    res.status(HttpStatus.NO_CONTENT).send();
  });
});

module.exports = router;
