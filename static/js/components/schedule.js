import Vue from '../VueSetup';
import '../../scss/components/schedule.scss';

import CourseService from '../services/CourseService';
import Schedule from '../models/Schedule'
import Semester from '../models/Semester';

// Course component
import './course';

Vue.component('schedule', {
  props: {
    schedule: {
      type: Schedule,
      required: false
    }
  },
  asyncComputed: {
    semester: {
      async get() {
        return await CourseService.getSemester({code: '2017F'})
      },
      default () {
        return Semester.makeEmpty();
      }
    }
  },
  template: '<div class="component-test">' +
  '<p>This is a styled test Schedule!</p>' +
  '<template v-for="course in semester.courses" >' +
    '<course v-bind:course="course"></course>' +
  '</template> ' +
  '</div>',
});
