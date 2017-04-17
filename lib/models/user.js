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
  if (newSchedule instanceof Schedule.schema) {
    this.schedules.push(newSchedule);
  } else {
    logger.log('Schedule input is an incorrect type.');
  }
};

userSchema.methods.saveToDB = function () {
    // Saves to the MongoDB
  this.save((err, savedUser) => {
    if (err) return console.error(err);
    logger.log(savedUser);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
module.exports.schema = userSchema;

