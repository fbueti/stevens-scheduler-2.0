/**
 * Created by austin on 4/30/17.
 */
import './main';
import Vue from './VueSetup';
import ApiService from './services/ApiService';
// Components
import './components/schedule-preview';
import './components/schedule';

// Styles
import '../scss/home.scss';

// Setup app

const app = new Vue({
  el: '#app',
  data: {
    message: 'Schedules',
    selectedSchedule: null,
    addFormShowing: false,
  },
  asyncComputed: {
    schedules: {
      async get() {
        return ApiService.getSchedules();
      },
      default() {
        return [];
      },
    },
  },
  methods: {
    showAddForm() {
      this.addFormShowing = true;
    },
    createSchedule() {
      // Click Event
      // Create a new schedule then add it to the array of schedules
      ApiService.createNewSchedule().then((schedule) => {
        this.schedules.push(schedule);
        // Todo: Should also redirect to the schedule edit page?
      });
    },
    scheduleDeleted(schedule) {
      // Remove the deleted schedule from the array
      // Also check if it is the selected
      if (this.selectedSchedule && this.selectedSchedule.id === schedule.id) {
        this.scheduleDeselect();
      }
      this.schedules.splice(this.schedules.indexOf(schedule), 1);
    },
    scheduleSelect(schedule) {
      this.selectedSchedule = schedule;
    },
    isSelected(schedule) {
      // If there is a selected schedule, check if the ids match
      // otherwise always false
      return this.selectedSchedule ? schedule.id === this.selectedSchedule.id : false;
    },
    scheduleDeselect() {
      this.selectedSchedule = null;
    },
  },
});
