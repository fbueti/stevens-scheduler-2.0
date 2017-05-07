/**
 * Created by austin on 4/27/17.
 */
import Course from './Course';

class Semester {
  constructor(term, data) {
    const semData = data.$;
    const coursesData = data.Course;
    this.term = term;
    this.numMeetings = Number(semData.Meetings);
    this.numReqs = Number(semData.Requirements);
    this.courses = [];
    for (const cData of coursesData) {
      this.courses.push(new Course(cData));
    }
  }

  getScheduleCourses(callNumbers) {
    // Map over the courses in the semester, pulling by course.callNumber == courseCode
    return this.courses.filter((course) => {
        return callNumbers.indexOf(course.callNumber) !== -1;
    });
  }

  static makeEmpty() {
    return new Semester({}, { $: {}, Course: [] });
  }
}

export default Semester;
