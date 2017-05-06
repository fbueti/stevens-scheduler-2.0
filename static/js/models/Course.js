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
    this.minCredit = Number(courseData.MinCredit);
    this.maxCredit = Number(courseData.MaxCredit);
    this.maxEnrollment = Number(courseData.MaxEnrollment);
    this.currentEnrollment = Number(courseData.CurrentEnrollment);
    this.status = courseData.Status;
    this.startDate = new Date(courseData.StartDate);
    this.endDate = new Date(courseData.EndDate);
    this.instructors = [];

    this.isFull = this.currentEnrollment === this.maxEnrollment;

    // Store common search terms in lower case so we don't have to calculate every time
    this.titleLower = this.title.toLowerCase();
    this.sectionLower = this.section.toLowerCase();

    // Sometimes there are more than one instructor
    // Get 'em all
    let instructorNum = 1;
    for (let instructKey = `instructor${instructorNum}`; instructKey in data; instructorNum++) {
      this.instructors.push(data[instructKey]);
    }

    // Build meetings and requirements
    this.meetings = [];
    if (meetingsData) {
      for (const meetData of meetingsData) {
        this.meetings.push(new Meeting(meetData));
      }
    }

    this.requirements = [];
    if (reqsData) {
      for (const rData of reqsData) {
        this.requirements.push(new Requirement(rData));
      }
    }
  }

  quickContains(query) {
    return this.sectionLower.search(query) > -1;
  }

  contains(query) {
    // Todo: allow for custom searching by passed list of keys
    return this.sectionLower.search(query) > -1 || this.titleLower.search(query) > -1;
  }
}

export default Course;
