/**
 * Created by austin on 4/27/17.
 *
 *
 * Handles Http Requests to our local api
 */
import Vue from '../VueSetup';
import Schedule from '../models/Schedule';

const SCHEDULES_BASE_URL = 'schedules';
const USERS_BASE_URL = 'users';

class ApiService {

  // Schedules
  static getSchedules() {
    return Vue.http.get(SCHEDULES_BASE_URL)
        .then(response => response.body.map(data => new Schedule(data)))
        .catch((error) => {
          // Todo: Handle error
          console.error(error);
          throw error;
        });
  }

  static getScheduleById(id) {
    return Vue.http.get(`${SCHEDULES_BASE_URL}/${id}`)
        .then(response =>
            new Schedule(response.body))
        .catch((error) => {
          console.error(error);
          throw error;
        });
  }

  static deleteSchedule(schedule) {
    return Vue.http.delete(`${SCHEDULES_BASE_URL}/${schedule.id}`)
        .then(() => {}) // Todo: could expose more
        .catch((error) => {
          // Todo: Handle error
          console.error(error);
          throw error;
        });
  }

  static updateSchedule(schedule) {
    // No response data on success
    return Vue.http.put(`${SCHEDULES_BASE_URL}/${schedule.id}`, schedule)
        .then(() => {}) // Todo: could expose more
        .catch((error) => {
          // Todo: Handle error
          console.error(error);
          throw error;
        });
  }

  static createNewSchedule(data = {}) {
    return Vue.http.post(SCHEDULES_BASE_URL, data)
        .then(response =>
            new Schedule(response.body))
        .catch((error) => {
          // Todo: Handle error
          console.error(error);
          throw error;
        });
  }

  // Users
  static deleteUser() {
    // No content on response
    return Vue.http.delete(`${USERS_BASE_URL}`)
        .catch((error) => {
          // Todo: Handle error
          console.error(error);
          throw error;
        });
  }
}

export default ApiService;
