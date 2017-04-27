/**
 * Created by austin on 4/27/17.
 */

class Semester {
  constructor(term, numMeetings, numReqs, courses) {
    this.term = term;
    this.numMeetings = numMeetings;
    this.numReqs = numReqs;
    this.courses = [];
    for (const courseData of courses) {
      this.courses.push(new Course(courseData));
    }
  }
}

class Course {
  constructor(data) {
    this.section = data.Section;
    this.title = data.Title;
    this.callNumber = data.CallNumber;
    this.minCredit = data.MinCredit;
    this.maxCredit = data.MaxCredit;
    this.maxEnrollment = data.MaxEnrollment;
    this.currentEnrollment = data.CurrentEnrollment;
    this.status = data.Status;
    this.startDate = data.StartDate;
    this.endDate = data.EndDate;
    this.instructors = [];
    // Sometimes there are more than one instructor
    // Get 'em all
    let instructorNum = 1;
    for(let instructKey = `instructor${instructorNum}`; instructKey in data; instructorNum++) {
      this.instructors.push(data[instructKey]);
    }
    // Term is handled in the Schedule
  }
}

