
/**
 * Created by austin on 4/3/17.
 */

const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');

// Note: all authenticated routes should have a User stored in req.user
// Note: if any errors occurs, throw them with `throw createError(HttpStatus.[ERROR], [Description])`

/*
* How to require login:
  app.get('/example',
    require('connect-ensure-login').ensureLoggedIn(),
      (req, res) => {
        res.render('example', { user: req.user });
  });
* */

router.post('/schedules', (req, res) => {
  // Todo: Create a new Schedule and save it to database
  // Data for schedule should be in req.body
  // Return a response with status HttpStatus.CREATED
});

router.get('/schedules', (req, res) => {
  // Todo: Get all of a user’s schedules
  // Return them as json
});

router.get('/schedules/:id', (req, res) => {
  // Todo: get a schedule with the associated id
  // Should be found in req.params.id (?)
  // Return it as json
});

router.delete('/schedules/:id', (req, res) => {
  // Todo: delete a schedule with the associated id
  // Return a response with status HttpStatus.NO_CONTENT
});

router.update('/schedules/:id', (req, res) => {
  // Todo: update a schedule with the associated id
  // Return the updated schedule as json
});

module.exports = router;
