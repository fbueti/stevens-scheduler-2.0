/**
 * Created by austin on 4/27/17.
 *
 *
 * Handles HTTP Request to Stevens
 */

const STEVENS_BASE_URL = 'https://web.stevens.edu/scheduler/core/core.php?cmd=';
const STEVENS_TERMS_URL = `${STEVENS_BASE_URL}terms`;
const STEVENS_SEMESTER_URL = `${STEVENS_BASE_URL}getxml&term=`;

class CourseService {
  static getTerms() {
    return Vue.http.get(STEVENS_TERMS_URL)
        .then((response) => {
          // Todo: Parse XML into list of terms
          const terms = [];

          return terms;
        })
        .catch((error) => {
          // Todo: Handle?
        });
  }

  static getSemester(term) {
    return Vue.http.get(`${STEVENS_SEMESTER_URL}${term}`)
        .then((response) => {
          // Todo: Parse XML into a Semester object



        })
        .catch((error) => {
          // Todo: Handle?
        });
  }
}
