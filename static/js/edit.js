/**
 * Created by austin on 4/30/17.
 */
import './main';
import Semester from './models/Semester';
import Schedule from './models/Schedule';
import Vue from './VueSetup';
import ApiService from './services/ApiService';
import CourseService from './services/CourseService';
// Components
import './components/schedule';

// Styles
import '../scss/edit.scss';

function stripId() {
  const url = window.location.href;
  let idString;
  for (let i = url.length - 1; i >= 0; i--) {
    if (url.charAt(i) === '/') {
      idString = url.substr(i + 1);
      break;
    }
  }
  return idString;
}

const app = new Vue({
  el: '#app',
  data() {
    return {
      id: stripId(),
      semesterLoaded: false,
    };
  },
  computed: {
    scheduleLoaded() {
      return (this.schedule && this.schedule.termCode !== undefined);
    },
  },
  asyncComputed: {
    schedule: {
      get() {
        console.log('Loading schedule!');
        return ApiService.getScheduleById(this.id)
            .then((schedule) => {
              console.log('Loaded schedule!');
              this.scheduleLoaded = true;
              return schedule;
            });
      },
      default() {
        return null;
      },
      // semester: {
      //   get() {
      //     console.log('Loading semester!');
      //     const schedule = this.schedule;
      //     console.log(schedule);
      //     return CourseService.getSemesterByCode(schedule.termCode)
      //         .then((semester) => {
      //           console.log('Loaded semester!');
      //           this.semesterLoaded = true;
      //           return semester;
      //         });
      //   },
      // },
    },

  },
  methods: {},
});
