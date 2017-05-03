import Vue from '../VueSetup';
import '../../scss/components/schedule.scss';

import CourseService from '../services/CourseService';
import Schedule from '../models/Schedule';
import Semester from '../models/Semester';

// Course component
import './course';

// We could make this either editable or not,
//  and show the Semester course selector only if editable

Vue.component('schedule', {
  props: {
    schedule: {
      type: Schedule,
      required: true,
    },
    editable: {
      type: Boolean,
      require: false,
      default: true,
    },
  },
  asyncComputed: {
    semester: {
      async get() {
        if (this.schedule.termCode) {
          return CourseService.getSemesterByCode(this.schedule.termCode);
        }
        // Empty, no term provided
        return new Promise((resolve, reject) => resolve([]));
      },
      default() {
        return Semester.makeEmpty();
      },
    },
  },
  // Show semester course selection only if editable
  template: `<div class="component-schedule"> 
  <p>This is a styled test Schedule!</p> 
  <template v-if="editable" v-for="course in semester.courses"> 
    <course v-bind:course="course"></course> 
  </template>  
  </div>`,
});
