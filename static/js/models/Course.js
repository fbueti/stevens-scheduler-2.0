/**
 * Created by austin on 4/27/17.
 */
import Meeting from './Meeting';
import Requirement from './Requirement';

class Course {
  constructor(data) {
    const courseData = data.$;
    const meetingsData = data.Meeting;
    const reqsData = data.Requirement;

    this.section = courseData.Section;
    this.title = courseData.Title;
    this.callNumber = courseData.CallNumber;
    this.minCredit = courseData.MinCredit;
    this.maxCredit = courseData.MaxCredit;
    this.maxEnrollment = courseData.MaxEnrollment;
    this.currentEnrollment = courseData.CurrentEnrollment;
    this.status = courseData.Status;
    this.startDate = courseData.StartDate;
    this.endDate = courseData.EndDate;
    this.instructors = [];
    // Sometimes there are more than one instructor
    // Get 'em all
    let instructorNum = 1;
    for (let instructKey = `instructor${instructorNum}`; instructKey in data; instructorNum++) {
      this.instructors.push(data[instructKey]);
    }

    // Build meetings and requirements
    this.meetings = [];
    for (const meetData of meetingsData) {
      this.meetings.push(new Meeting(meetData));
    }

    this.requirements = [];
    for (const rData of reqsData) {
      this.requirements.push(new Requirement(rData));
    }
  }
}

export default Course;
