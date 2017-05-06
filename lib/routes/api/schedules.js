/**
 * Created by austin on 4/3/17.
 */

const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');
const uuid = require('node-uuid');
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
      const data = {
        courses: req.body.courses || [],
        termCode: req.body.termCode || '',
        name: req.body.name || '',
        notes: req.body.notes || '',
      };
      let newSchedule;
      req.user.addSchedule(data)
          .then((schedule) => {
            newSchedule = schedule;
            return req.user.save();
          }).then(() => {
            res.status(HttpStatus.CREATED).json(newSchedule);
          }).catch((error) => {
            res.status(HttpStatus.BAD_REQUEST).send();
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
          }).catch((err) => {
            res.status(HttpStatus.NOT_FOUND).send();
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
          .catch((err) => {
            res.status(HttpStatus.NOT_FOUND).send();
          });
    });

// Update a schedule with the associated id
// Return the updated schedule as json
router.put('/schedules/:id',
    require('connect-ensure-login').ensureLoggedIn(),
    (req, res) => {
      const schedule = req.body;
      req.user.getScheduleById(req.params.id)
          .catch(() => {
            throw createError(HttpStatus.NOT_FOUND, `Can't find schedule with id ${req.params.id}`);
          })
          .then((toUpdate) => {
            // Update the schedule
            for (const key of Object.keys(Schedule.schema.paths)) {
              if (key !== '_id' && key !== 'id') {
                toUpdate[key] = schedule[key];
              }
            }
            // Save the parent
            return req.user.save();
          })
          .then(() => {
            res.status(HttpStatus.NO_CONTENT).send();
          })
          .catch((err) => {
            if (err.status) throw err;
            // Otherwise a server error
            throw createError(HttpStatus.INTERNAL_SERVER_ERROR, `Unable to update schedule: ${err}`);
          });
    });

module.exports = router;
