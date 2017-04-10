// schedule.js
const mongoose = require('mongoose');
const logger = require('../utils/loggers').logger;

// @Greg: these look good but all must return a promise
// Todo: Look at this page: http://mongoosejs.com/docs/promises.html
// Native Promise's are a good choice

/* Example Schedule
var testSched = new Schedule({
    id:"test_001",
    courses: ["10032", "10038", "10053"],
    term:"2017F",
    name:"Test Schedule 01",
    notes:"Do I work?"
});
*/

const scheduleSchema = mongoose.Schema({
  id: String,
  courses: [String],
  term: String,
  name: String,
  notes: String,
});

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
scheduleSchema.methods.addCourse = function (courseNumber) {
  if (courseNumber instanceof String) {
    this.courses.push(courseNumber);
  } else {
    logger.log('Course input is an incorrect type.');
  }
};

scheduleSchema.methods.removeCourse = function (courseNumber) {
  if (courseNumber instanceof String) {
    const index = this.courses.indexOf(courseNumber);
    if (index != -1) {
      this.courses.splice(index, 1);
    } else {
      logger.log(`${courseNumber} is not currently a part of the schedule.`);
    }
  } else {
    logger.log('Course input is an incorrect type.');
  }
};

scheduleSchema.methods.saveToDB = function () {
    // Saves to the MongoDB
  this.save((err, savedSched) => {
    if (err) return console.error(err);
    logger.log(savedSched);
  });
};

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
module.exports.scheme = scheduleSchema;
