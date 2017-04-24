/**
 * Created by austin on 4/3/17.
 */

const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');
const uuid = require('node-uuid');
const Schedule = require('../../models/schedule.js');
// Note: all authenticated routes should have a User stored in req.user

/*
 * How to require login:
 app.get('/example',
 require('connect-ensure-login').ensureLoggedIn(),
 (req, res) => {
 res.render('example', { user: req.user });
 });
 * */

router.post('/schedules',
  require('connect-ensure-login').ensureLoggedIn(),
  (req, res) => {
    // Data for schedule should be in req.body
    // Return a response with status HttpStatus.CREATED
    Schedule.create({ id: uuid(), courses: [], term: '', name: '', notes: '' }).then((schedule) => {
      return req.user.addSchedule(schedule);
    }).then(() => {
      req.user.save();
    }).then(() => {
      res.status(HttpStatus.CREATED).send();
    }).catch((error) => {
      res.status(HttpStatus.BAD_REQUEST).send();
    })
});

router.get('/schedules',
    require('connect-ensure-login').ensureLoggedIn(),
    (req, res) => {
      // Return them as json
      const schedules = req.user.schedules;
      res.json(schedules);
    });

router.get('/schedules/:id',
   require('connect-ensure-login').ensureLoggedIn(),
   (req, res) => {
      const schedules = req.user.schedules;
      for(let i = 0; i < schedules.length; i++) {
         if(schedules[i].id == req.params.id) {
            res.json(schedules[i]);
            break;
         }
      }
      //Else schedule with such id not found.

  // Todo: get a schedule with the associated id
  // Should be found in req.params.id (?)
  // Return it as json
});

router.delete('/schedules/:id',
   require('connect-ensure-login').ensureLoggedIn(),
   (req, res) => {
      let wasDeleted = false;
      for(let i = 0; i < req.user.schedules.length; i++) {
         if(req.user.schedules[i] == req.params.id) {
            req.user.schedules = req.user.schedules.splice(i,1);// Remove from that index
            wasDelted = true;
            break;
         }
      }

      if(wasDeleted) {
         req.user.save().then(() => {
            res.status(HttpStatus.NO_CONTENT).send();
         });
      } else {
         res.status(HttpStatus.NOT_FOUND).send();
      }


  // Todo: delete a schedule with the associated id
  // Return a response with status HttpStatus.NO_CONTENT
});

router.put('/schedules/:id',
   require('connect-ensure-login').ensureLoggedIn(),
   (req, res) => {
  // Todo: update a schedule with the associated id
  // Return the updated schedule as json
});

module.exports = router;
