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
      computed: {  id ()  {
            var url = window.location.href;
            for (var i = url.length - 1; i >= 0; i--) {
                if (url.charAt(i) === '/') {
                    return url.substr(ind);
            }
        }
    },
    },asyncComputed: {
        schedule: {
            async get() {
                    return ApiService.getScheduleById(this.id);
                },
                default () {
                    return null;
                },
        },
    semester: {
      async get() {
         return CourseService.getSemesterByCode(this.schedule.termCode);
      }
      default() {
         return Semester.makeEmpty();
      },
   }},
    methods: {
        addCourse(course) {

            },
            removeCourse(course) {

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
