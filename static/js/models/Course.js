/**
 * Created by austin on 4/27/17.
 */
import Meeting from './Meeting';
import Requirement from './Requirement';

/**
 * Todo: Cleanup and Documentation
 */
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
    this.status = courseData.Status === 'O' ? 'open' : 'closed';
    this.startDate = new Date(courseData.StartDate);
    this.endDate = new Date(courseData.EndDate);

    // Helpful bools
    this.isFull = this.currentEnrollment === this.maxEnrollment;
    this.isClosed = (this.status === 'closed');
    this.isWeb = this.section.indexOf('WS') > -1;

    // Store common search terms in lower case so we don't have to calculate every time
    this.titleLower = this.title.toLowerCase();
    this.sectionLower = this.section.toLowerCase();

    // Sometimes there are more than one instructor
    // Get 'em all
    this.instructors = [];
    let instructorNum = 1;
    for (let instructKey = `instructor${instructorNum}`; instructKey in data; instructorNum++) {
      this.instructors.push(data[instructKey]);
    }

    // Build meetings and requirements
    this.meetings = [];
    this.hasMeetings = false;
    if (meetingsData) {
      for (const meetData of meetingsData) {
        const meetDayStr = Meeting.getMeetingDayString(meetData);
        // Break up the meeting Day String into each day if not TBA
        this.hasMeetings = true;
        if (meetDayStr === 'TBA') {
          this.meetings.push(new Meeting(meetData, meetDayStr));
        } else {
          for (const day of meetDayStr) {
            this.meetings.push(new Meeting(meetData, day));
          }
        }
      }
    }

    this.isTBA = this.hasMeetings && !this.isWeb;

    this.requirements = [];
    if (reqsData) {
      for (const rData of reqsData) {
        this.requirements.push(new Requirement(rData));
      }
    }
  }

  // Composable contains functions
  quickContains(query, showClosed = false) {
    return (this.sectionContains(query) || this.titleContains(query))
        && showClosed ? true : this.isClosed;
  }

  sectionContains(query) {
    return this.sectionLower.indexOf(query) > -1;
  }

  titleContains(query) {
    return this.titleLower.indexOf(query) > -1;
  }
}

export default Course;
