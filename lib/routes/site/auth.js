/**
 * Created by austin on 4/10/17.
 */

const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');
const passport = require('passport');

router.get('/login', (req, res) => res.redirect(301, '/login/google'));
router.get('/login/google', passport.authenticate('google', { scope: ['profile'] }));

/**
 * Either redirect to / on failure or /home on success
 */
router.get('/login/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/',
    }),
    (req, res) => {
      res.redirect('/home');
    });

/**
 * Destroy session and redirect to the splash page
 */
router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
