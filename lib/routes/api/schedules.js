/**
 * Created by austin on 4/3/17.
 */

const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');
const uuid = require('node-uuid');
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
    async (req, res) => {
      // Data for schedule should be in req.body
      // Return a response with status HttpStatus.CREATED
      try {
        const newSchedule = await req.user.addSchedule(req.body);
        await req.user.save();
        res.status(HttpStatus.CREATED).json(newSchedule);
      } catch (error) {
        if (error instanceof ValidatorError) {
          res.status(HttpStatus.BAD_REQUEST).send();
        } else {
          throw error;
        }
      }
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
    async (req, res) => {
      try {
        const schedule = await req.user.getScheduleById(req.params.id);
        res.json(schedule);
      } catch (error) {
        if (error && error.status === HttpStatus.NOT_FOUND) {
          res.status(HttpStatus.NOT_FOUND).send();
        } else {
          throw error;
        }
      }
    });


// Delete a schedule with the associated id
// Return a response with status HttpStatus.NO_CONTENT
router.delete('/schedules/:id',
    require('connect-ensure-login').ensureLoggedIn(),
    async (req, res) => {
      try {
        const schedule = await req.user.getScheduleById(req.params.id);
        await schedule.remove();
        await req.user.save();
        res.status(HttpStatus.NO_CONTENT).send();
      } catch (error) {
        if (error && error.status === HttpStatus.NOT_FOUND) {
          res.status(HttpStatus.NOT_FOUND).send();
        } else if (error instanceof ValidatorError) {
          res.status(HttpStatus.BAD_REQUEST).send();
        } else {
          throw error;
        }
      }
    });

// Update a schedule with the associated id
// Return the updated schedule as json
router.put('/schedules/:id',
    require('connect-ensure-login').ensureLoggedIn(),
    async (req, res) => {
      const schedule = req.body;
      const id = req.params.id;
      try {
        const toUpdate = await req.user.getScheduleById(id);
        // Update all the keys
        for (const key of Object.keys(Schedule.schema.paths)) {
          if (key !== '_id' && key !== 'id') {
            toUpdate[key] = schedule[key];
          }
        }
        await req.user.save();
        res.status(HttpStatus.NO_CONTENT).send();
      } catch (error) {
        if (error && error.status === HttpStatus.NOT_FOUND) {
          res.status(HttpStatus.NOT_FOUND).send();
        } else if (error instanceof ValidatorError) {
          res.status(HttpStatus.BAD_REQUEST).send();
        } else {
          throw error;
        }
      }
    });

module.exports = router;
