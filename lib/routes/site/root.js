/**
 * Created by austin on 4/6/17.
 */
const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');

/**
 * Splash page with login
 */
router.get('/', (req, res) => {
  res.render('splash', {});
});

/**
 * The Home page with all the schedules
 */
router.get('/home',
  require('connect-ensure-login').ensureLoggedIn(),
    (req, res) => {
      res.render('home', { user: req.user });
    });

/**
 * Editing a specific schedule
 */
router.get('/schedule/:id',
  require('connect-ensure-login').ensureLoggedIn(),
    (req, res) => {
      res.render('edit', { user: req.user });
    });

/**
 * A statically shared page
 */
router.get('/shared', (req, res) => {
  // GET /shared?term=2017F&courses=10102,24321
  res.render('shared', { term: req.query.term,
    courses: req.query.courses });
});


module.exports = router;
