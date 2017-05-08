/**
 * Created by austin on 4/3/17.
 */

const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');
const { ValidatorError } = require('mongoose').SchemaType;
const Schedule = require('../../models/Schedule.js');
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
      let newSchedule;
      req.user.addSchedule(req.body)
          .then((schedule) => {
            newSchedule = schedule;
            return req.user.save();
          })
          .then(() => {
            res.status(HttpStatus.CREATED).json(newSchedule);
          })
          .catch((error) => {
            if (error instanceof ValidatorError) {
              res.status(HttpStatus.BAD_REQUEST).send();
            } else {
              throw error;
            }
          });
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
      req.user.getScheduleById(req.params.id)
          .then((schedule) => {
            res.json(schedule);
          })
          .catch((error) => {
            if (error && error.status === HttpStatus.NOT_FOUND) {
              res.status(HttpStatus.NOT_FOUND).send();
            } else {
              throw error;
            }
          });
    });


// Delete a schedule with the associated id
// Return a response with status HttpStatus.NO_CONTENT
router.delete('/schedules/:id',
    require('connect-ensure-login').ensureLoggedIn(),
    (req, res) => {

      req.user.getScheduleById(req.params.id)
          .then((schedule) => {
            return schedule.remove();
          })
          .then(() => {
            return req.user.save();
          })
          .then(() => {
            res.status(HttpStatus.NO_CONTENT).send();
          })
          .catch((error) => {
            if (error && error.status === HttpStatus.NOT_FOUND) {
              res.status(HttpStatus.NOT_FOUND).send();
            } else if (error instanceof ValidatorError) {
              res.status(HttpStatus.BAD_REQUEST).send();
            } else {
              throw error;
            }
          });
    });

// Update a schedule with the associated id
// Return the updated schedule as json
router.put('/schedules/:id',
    require('connect-ensure-login').ensureLoggedIn(),
    (req, res) => {
      const schedule = req.body;
      const id = req.params.id;
      req.user.getScheduleById(id)
          .then((toUpdate) => {
            // Update all the keys
            for (const key of Object.keys(Schedule.schema.paths)) {
              if (key !== '_id' && key !== 'id') {
                toUpdate[key] = schedule[key];
              }
            }
            return req.user.save();
          })
          .then(() => {
            res.status(HttpStatus.NO_CONTENT).send();
          })
          .catch((error) => {
            if (error && error.status === HttpStatus.NOT_FOUND) {
              res.status(HttpStatus.NOT_FOUND).send();
            } else if (error instanceof ValidatorError) {
              res.status(HttpStatus.BAD_REQUEST).send();
            } else {
              throw error;
            }
          });
    });

module.exports = router;
