import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import Vue from '../VueSetup';
import ApiService from '../services/ApiService';
import CourseService from '../services/CourseService';
import Schedule from '../models/Schedule';
import Semester from '../models/Semester';

// Components
import './course';
import './spinner';

// Styles
import '../../scss/components/schedule.scss';

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
  data() {
    return {
      previewCourse: null,
      semesterLoaded: false,
      courseQuery: '',
    };
  },
  computed: {
    filteredSemesterCourses() {
      if (this.courseQuery === '') return this.semester.courses; // If no search term
      return this.searchCourses();
    },
    scheduleCourses() {
      // Map over the courses in the semester, pulling by course.callNumber == courseCode
      if (!this.loaded) return []; // default value
      return this.semester.courses.filter(course => this.schedule.hasCourse(course.callNumber));
    },
    loaded() {
      return (this.semester && this.semesterLoaded);
    },
  },
  asyncComputed: {
    semester: {
      get() {
        console.log(this.schedule);
        return CourseService.getSemesterByCode(this.schedule.termCode)
            .then((semester) => {
              this.semesterLoaded = true;
              return semester;
            });
      },
      default() {
        return Semester.makeEmpty();
      },
    },
  },
  methods: {
    searchCourses: throttle(function search() {
      // Throttled to get rid of unnecessary filters when typing quickly
      // Update the list of filtered Courses
      return this.semester.courses.filter(course =>
          course.contains(this.courseQuery.toLowerCase()));
    }, 250),
    addCourse(course) {
      this.schedule.addCourse(course);
    },
    removeCourse(course) {
      this.schedule.removeCourse(course);
    },
    autoSaveSchedule: debounce(function save() {
      this.saveSchedule();
    }, 1000), // Save a max of once a second
    saveSchedule() {
      ApiService.updateSchedule(this.schedule)
          .then((updated) => {
            // Great
            console.log(`Saved: ${updated}`);
          })
          .catch((err) => {
            // Not Great
            console.error(err);
          });
    },
  },
  // Show semester course selection only if editable
  template: `<div class="component-schedule"> 
    <div class="loading" v-if="!loaded">
        <spinner name="cube-grid"></spinner>
    </div>
    <div class="loaded" v-else>
      <section  v-if="editable">
          <input id="name" @keyup="autoSaveSchedule" :value="schedule.name" v-model="schedule.name"/>
          <input id="notes" @keyup="autoSaveSchedule" :value="schedule.notes" v-model="schedule.notes"/>
          <input class="course-search" type="text" placeholder="Search courses" v-model="courseQuery">
          
          <select class="course-selector" size="25" v-model="previewCourse">
              <option v-for="course in filteredSemesterCourses" :key="course.callNumber" :value="course"> 
              {{course.section}}: {{course.title}} 
              </option>
          </select>
          
      </section>  
    
      <section class="schedule-view">
        <course  v-for="course in scheduleCourses" :key="course.callNumber" :course="course"></course>
        <course class="preview" v-if="previewCourse" :course="previewCourse"></course>
      </section>
    </div>
  </div>`,
});
