// getting-started.js
const mongoose = require('mongoose');
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');
const Schedule = require('./Schedule');
const GoogleProfile = require('./GoogleProfile');


const userSchema = mongoose.Schema({
  googleUuid: String,
  schedules: [Schedule.schema],
  profile: GoogleProfile.schema,
});

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
userSchema.methods = {
  addSchedule(newScheduleData) {
    return new Promise((resolve, reject) => {
      const newSchedule = this.schedules.create(newScheduleData);
      this.schedules.push(newScheduleData);
      resolve(newSchedule);
    });
  },
  getScheduleById(id) {
    return new Promise((resolve, reject) => {
      const schedule = this.schedules.id(id);
      // null if not found
      if (schedule) {
        resolve(schedule);
      } else {
        reject(createError(HttpStatus.NOT_FOUND, `No schedule with id: ${id}`));
      }
    });
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
module.exports.schema = userSchema;
