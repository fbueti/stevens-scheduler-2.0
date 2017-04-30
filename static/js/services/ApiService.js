/**
 * Created by austin on 4/27/17.
 *
 *
 * Handles Http Requests to our local api
 */
const BASE_URL = 'http://localhost:3000/api';
const SCHEDULES_BASE_URL = `${BASE_URL}/schedules`;
const USERS_BASE_URL = `${BASE_URL}/users`;

class ApiService {

  // Schedules
  static getSchedules() {
    return Vue.http.get(SCHEDULES_BASE_URL)
        .then((response) => {
          // Todo: build Schedules
        })
        .catch((error) => {
          // Todo: Handle error
        })
  }

  static getScheduleById(id) {
    return Vue.http.get(`${SCHEDULES_BASE_URL}/${id}`)
        .then((response) => {
          // Todo: build Schedules
        })
        .catch((error) => {
          // Todo: Handle error
        })
  }

  static deleteSchedule(schedule) {
    return Vue.http.delete(`${SCHEDULES_BASE_URL}/${schedule.id}`)
        .then((response) => {
          // Todo: build Schedules
        })
        .catch((error) => {
          // Todo: Handle error
        })
  }

  static updateSchedule(schedule) {
    return Vue.http.put(`${SCHEDULES_BASE_URL}/${schedule.id}`)
        .then((response) => {
          // Todo: build Schedules
        })
        .catch((error) => {
          // Todo: Handle error
        })
  }

  static createNewSchedule() {
    return Vue.http.post(SCHEDULES_BASE_URL)
        .then((response) => {
          // Success
        })
        .catch((error) => {
          // Todo: Handle error
        })
  }

  // Users
  static deleteUserById(id) {
    return Vue.http.delete(`${USERS_BASE_URL}/${id}`)
        .then((response) => {
          // Successful deletion
        })
        .catch((error) => {
          // Todo: Handle error
        })
  }
}