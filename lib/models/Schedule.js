// schedule.js
// Embedded Document
const mongoose = require('mongoose');
const { logger } = require('../utils/loggers');

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
  courseCodes: { type: [String], default: [] },
  termCode: { type: String, required: true },
  name: { type: String, required: true },
  notes: { type: String, default: '' },
});

// scheduleSchema.virtual('id').get(() =>
//     this._id.toString() // eslint-disable-line
// );

scheduleSchema.methods = {
  addCourse(courseNumber) {
    return new Promise((resolve, reject) => {
      if (courseNumber instanceof String) {
        this.courses.push(courseNumber);
        resolve();
      } else {
        throw new Error('Course input is an incorrect type.');
      }
    });
  },
  removeCourse(courseNumber) {
    return new Promise((resolve, reject) => {
      if (courseNumber instanceof String) {
        const index = this.courses.indexOf(courseNumber);
        if (index !== -1) {
          this.courses.splice(index, 1);
          resolve();
        } else {
          logger.log(`${courseNumber} is not currently a part of the schedule.`);
        }
      } else {
        throw new Error('Course input is an incorrect type.');
      }
    });
  },
};

module.exports = {};
module.exports.schema = scheduleSchema;
