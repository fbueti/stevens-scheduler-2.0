/**
 * Created by austin on 4/27/17.
 *
 *
 * Handles HTTP Request to Stevens
 */
import Vue from '../VueSetup';
import Semester from '../models/Semester';
import Course from '../models/Course';

const STEVENS_BASE_URL = 'https://web.stevens.edu/scheduler/core/core.php?cmd=';
const STEVENS_TERMS_URL = `${STEVENS_BASE_URL}terms`;
const STEVENS_SEMESTER_URL = `${STEVENS_BASE_URL}getxml&term=`;

class CourseService {
  static getTerms() {
    // return Vue.http.get(STEVENS_TERMS_URL)
    return Vue.http.get('http://54.71.50.103/p/terms')
        .then((response) => {
          // Todo: Parse XML into list of terms
          const terms = response.body;

          return terms;
        })
        .catch((error) => {
          // Todo: Handle?
        });
  }

  static getSemester(term) {
    // return Vue.http.get(`${STEVENS_SEMESTER_URL}${term}`)
    return Vue.http.get(`http://54.71.50.103/p/${term}`)
        .then((response) => {
          // Todo: Parse XML into a Semester object
          console.log(term);
          const courses = [];
          for (const data of response.body) {
            courses.push(new Course(data));
          }
          return new Semester(term, null, null, courses);
        })
        .catch((error) => {
          // Todo: Handle?
          throw error;
        });
  }
}

export default CourseService;
