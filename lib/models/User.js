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
      const data = newScheduleData;
      // Trim off trailing whitespace cause it's not fun and we're fun
      if (newScheduleData.termCode) {
        data.termCode = newScheduleData.termCode.trim();
      }

      if (newScheduleData.name) {
        data.name = newScheduleData.name.trim();
      }

      if (newScheduleData.notes) {
        data.notes = newScheduleData.notes.trim();
      }
      // Any non existing data will throw validator errors
      this.schedules.push(data);
      resolve(this.schedules[0]);
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
