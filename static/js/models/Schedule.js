/**
 * Created by austin on 4/27/17.
 */

class Schedule {
  constructor(data) {
    this.id = data.id;
    this.courseCodes = data.courses;
    this.term = data.term;
    this.name = data.name;
    this.notes = data.notes;
  }
}

export default Schedule;
