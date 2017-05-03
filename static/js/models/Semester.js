/**
 * Created by austin on 4/27/17.
 */
import Course from './Course';

class Semester {
  constructor(term, data) {
    const semData = data.$;
    const coursesData = data.Course;
    this.term = term;
    this.numMeetings = semData.Meetings;
    this.numReqs = semData.Requirements;
    this.courses = [];
    for (const cData of coursesData) {
      this.courses.push(new Course(cData));
    }
  }

  static makeEmpty() {
    return new Semester({}, { $: {}, Course: [] });
  }
}

export default Semester;
