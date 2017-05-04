/**
 * Created by austin on 4/30/17.
 */
import './main';
import Vue from './VueSetup';
import ApiService from './services/ApiService';
// Components
import './components/schedule';

// Styles
import '../scss/edit.scss';

const app = new Vue({
<<<<<<< HEAD
    el: '#app',
    data: {
        id: () => {
            var url = window.location.href;
            for (var i = url.length - 1; i >= 0; i--) {
                if (url.charAt(i) === '/') {
                    return url.substr(i);
                }
            }
        },
    },
    asyncComputed: {
        schedule: {
            async get() {
                    return ApiService.getScheduleById(this.id);
                },
                default () {
                    return null;
                },
        },
    },
    methods: {
        addCourse(course) {

            },
            removeCourse(course) {

            },
            saveSchedule(course) {

            },
    },
});
=======
  el: '#app',
  data: {
    id() {
      var url = window.location.href;
      var ind = 0;
      for (var i = url.length - 1; i >= 0; i--) {
        if (url.charAt(i) === '/') {
          ind = i;
          break;
        }
      }
      return url.substr(i);
    },
  },
  asyncComputed: {
    schedule: {
      async get() {
        return ApiService.getScheduleById(this.id);
      },
      default() {
        return null;
      },
    },
  },
  methods: {
    addCourse() {

    },
    removeCourse() {

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
>>>>>>> origin/master
