// getting-started.js
const mongoose = require('mongoose');
const Schedule = require('./schedule');
const GoogleProfile = require('./GoogleProfile');
const logger = require('../utils/loggers').logger;

const userSchema = mongoose.Schema({
  googleUuid: String,
  schedules: [Schedule.schema],
  profile: GoogleProfile.schema,
});

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
userSchema.methods.addSchedule = function (newSchedule) {
  return new Promise((resolve, reject) => {
    if (newSchedule instanceof Schedule.schema) {
      this.schedules.push(newSchedule);
      resolve();
    } else {
      throw new Error('Schedule input is an incorrect type.');
    }
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
module.exports.schema = userSchema;

