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

// router.get('/home', (req, res) => {
//   // Home page
// });

// router.get('/schedule/:id', (req, res) => {
//   // 'id' is found in req.params.id
// });

// router.get('/shared...', (req, res) => {
//   // Todo: account for url params
// });


module.exports = router;
