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
      let newSchedule;
      Schedule.create({ id: uuid(), courses: [], termCode: '', name: '', notes: '' }).then((schedule) => {
        newSchedule = schedule;
        return req.user.addSchedule(schedule);
      }).then(() => {
        req.user.save();
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
      const schedules = req.user.schedules;
      let schedule;
      for (let i = 0; i < schedules.length; i++) {
        if (schedules[i].id === req.params.id) {
          schedule = schedules[i];
          break;
        }
      }

      if (schedule) {
        res.json(schedule);
      } else {
        res.status(HttpStatus.NOT_FOUND).send();
      }
    });


// Delete a schedule with the associated id
// Return a response with status HttpStatus.NO_CONTENT
router.delete('/schedules/:id',
    require('connect-ensure-login').ensureLoggedIn(),
    (req, res) => {
      let wasDeleted = false;
      for (let i = 0; i < req.user.schedules.length; i++) {
        if (req.user.schedules[i].id === req.params.id) {
          req.user.schedules.splice(i, 1);// Remove from that index
          wasDeleted = true;
          break;
        }
      }

      if (wasDeleted) {
        req.user.save().then(() => {
          res.status(HttpStatus.NO_CONTENT).send();
        });
      } else {
        res.status(HttpStatus.NOT_FOUND).send();
      }
    });

// Update a schedule with the associated id
// Return the updated schedule as json
router.put('/schedules/:id',
   require('connect-ensure-login').ensureLoggedIn(),
   (req, res) => {
     let toUpdate;
     for (let i = 0; i < req.user.schedules.length; i++) {
       if (req.user.schedules[i].id === req.params.id) {
         toUpdate = req.user.schedules[i];
         break;
       }
     }

     if (toUpdate) {
       for (const key of Object.keys(Schedule.schema.paths)) {
         if (key !== '_id' && key !== 'id') {
           toUpdate[key] = req.body.schedule[key];
         }
       }

       res.user.save().then(() => {
         res.status(HttpStatus.NO_CONTENT);
       }).then(() => {
         res.json(toUpdate);
       });
     } else {
       res.status(HttpStatus.NOT_FOUND).send();
     }
   });

module.exports = router;
