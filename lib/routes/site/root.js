/**
 * Created by austin on 4/6/17.
 */
const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');

router.get('/', (req, res) => {
  // Splash page
  res.render('splash', {});
});

router.get('/home',
  require('connect-ensure-login').ensureLoggedIn(),
    (req, res) => {
      res.render('home', { user: req.user});
});

// router.get('/schedule/:id',
//   require('connect-ensure-login').ensureLoggedIn(),
//     (req, res) => {
//       res.render('schedule', { user: req.user });
// }); 

// router.get('/shared...', (req, res) => {
//   // Todo: account for url params
//   res.render('shared.pug', {});
// });


module.exports = router;
