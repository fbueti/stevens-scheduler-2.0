/**
 * Created by austin on 4/27/17.
 */
import { getQueryParams } from '../utils';


class Schedule {
  constructor(data) {
    this.id = data._id || data.id;
    this.courseCodes = data.courseCodes || [];
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

  hasCourseCode(callNumber) {
    return this.hasCourse({ callNumber });
  }

  hasCourse(course) {
    return this.courseCodes.indexOf(course.callNumber) !== -1;
  }

  /**
   * Turn the schedule into a URL hash. Not quite to spec w/ array.
   * Save everything but the id
   * @return {string}
   */
  get hash() {
    const codes = this.courseCodes.length === 0 ? '' : this.courseCodes.join(',').trim();

    return `termCode=${this.termCode}
    &courseCodes=${codes}
    &name=${this.name}&notes=${this.notes}`;
  }

  /**
   *
   * @param hash
   */
  static makeFromHash(hash) {
    const params = getQueryParams(hash);
    // Make the course codes an array
    params.courseCodes = params.courseCodes ? params.courseCodes.split(',') : [];
    return new Schedule(params);
  }

  static makeEmpty() {
    return new Schedule({
      id: '',
      termCode: '',
    });
  }
}

export default Schedule;