/**
 * Created by austin on 4/27/17.
 */
import Vue from '../VueSetup';
import Term from './Term';

class Schedule {
  constructor(data) {
    this.id = data.id;
    this.courseCodes = data.courses;
    this.termCode = data.termCode;
    this.name = data.name;
    this.notes = data.notes;
  }

  static makeEmpty() {
    return new Schedule({ id: '' });
  }
}

export default Schedule;
