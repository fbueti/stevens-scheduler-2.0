// schedule.js
// Embedded Document
const mongoose = require('mongoose');
const logger = require('../utils/loggers').logger;

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
  courses: [String],
  termCode: String,
  name: String,
  notes: String,
});

scheduleSchema.virtual('id').get(() =>
    this._id.toString()
);

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
scheduleSchema.methods.addCourse = function (courseNumber) {
  return new Promise((resolve, reject) => {
    if (courseNumber instanceof String) {
      this.courses.push(courseNumber);
      resolve();
    } else {
      throw new Error('Course input is an incorrect type.');
    }
  });
};

scheduleSchema.methods.removeCourse = function (courseNumber) {
  return new Promise((resolve, reject) => {
    if (courseNumber instanceof String) {
      const index = this.courses.indexOf(courseNumber);
      if (index != -1) {
        this.courses.splice(index, 1);
        resolve();
      } else {
        logger.log(`${courseNumber} is not currently a part of the schedule.`);
      }
    } else {
      throw new Error('Course input is an incorrect type.');
    }
  });
};

scheduleSchema.methods.saveToDB = function () {
    // Saves to the MongoDB
  return new Promise((resolve, reject) => {
    this.save((err, savedSched) => {
      if (err) return console.error(err);
      logger.log(savedSched);
      resolve();
    });
  });
};

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
module.exports.schema = scheduleSchema;
