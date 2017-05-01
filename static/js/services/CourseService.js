/**
 * Created by austin on 4/27/17.
 *
 *
 * Handles HTTP Request to Stevens
 */
import Vue from '../VueSetup';
import Semester from '../models/Semester';
import Course from '../models/Course';
import Term from '../models/Term';

// Todo: Write this using a Vue.resource

const COURSES_BASE_URL = 'courses';


class CourseService {
  static getTerms() {
    return Vue.http.get(`${COURSES_BASE_URL}/terms`)
        .then((response) => {
          const terms = [];
          for (const data of response.body.terms) {
            terms.push(new Term(data.$))
          }
          return terms;
        })
        .catch((error) => {
          // Todo: Handle?
          throw error;
        });
  }
  
  static getSemesterByCode(termCode) {
    return CourseService.getSemester({code: termCode, name: ''});
  }

  static getSemester(term) {
    return Vue.http.get(`${COURSES_BASE_URL}/semester/${term.code}`)
        .then((response) => {
          return new Semester(term, response.body.semester);
        })
        .catch((error) => {
          // Todo: Handle?
          throw error;
        });
  }
}

export default CourseService;
