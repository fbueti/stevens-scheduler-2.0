/**
 * Created by austin on 4/30/17.
 */
import './main';
import Semester from './models/Semester';
import Vue from './VueSetup';
import ApiService from './services/ApiService';
import CourseService from './services/CourseService';
// Components
import './components/schedule';

// Styles
import '../scss/edit.scss';

const app = new Vue({
  el: '#app',
  data: {},
  computed: {
    id() {
      const url = window.location.href;
      for (let i = url.length - 1; i >= 0; i--) {
        if (url.charAt(i) === '/') {
          return url.substr(i + 1);
        }
      }
    },
  },
  asyncComputed: {
    schedule: {
      async get() {
        console.log(this.id);
        return ApiService.getScheduleById(this.id);
      },
    },
    semester: {
      async get() {
        console.log(this.schedule);
        const schedule = await ApiService.getScheduleById(this.id);
        console.log(this.schedule);
        console.log("SCHEDULE STUFF");
        console.log(this.schedule.id);
        console.log(this.schedule.courses);
        return CourseService.getSemesterByCode(schedule.termCode);
      },
      default() {
        return Semester.makeEmpty();
      },
    },
  },
  methods: {
    addCourse(course) {
      this.schedule.removeCourse(course);
    },
    removeCourse(course) {
      this.schedule.removeCourse(course);
    },
    saveSchedule() {
      ApiService.updateSchedule(this.schedule)
          .then((updated) => {
            // Great
            console.log(updated);
          })
          .catch((err) => {
            // Not Great
            console.error(err);
          });
    },
  },
});
