/**
 * Created by austin on 4/27/17.
 */
import Vue from '../VueSetup';
import Term from './Term';

class Schedule {
  constructor(data) {
    this.id = data._id || data.id;
    this.courseCodes = data.courses || [];
    this.termCode = data.termCode;
    this.name = data.name || '';
    this.notes = data.notes || '';
  }

  addCourse(course) {
    this.courseCodes.push(course.callNumber);
  }

  removeCourse(course) {
    this.courseCodes.splice(this.courseCodes.indexOf(course.callNumber), 1);
  }

  hasCourse(callNumber) {
    return this.courseCodes.indexOf(callNumber) !== -1;
  }

  static makeEmpty() {
    return new Schedule({
      id: '',
    });
  }
}

export default Schedule;