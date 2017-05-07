import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import Vue from '../VueSetup';
import { fuzzyContains } from '../utils';
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
      showClosed: true,
      scheduleCourses: [],
    };
  },
  computed: {
    filteredSemesterCourses() {
      if (this.courseQuery === '') return this.semester.courses; // If no search term
      return this.searchCourses();
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
              // Load in the schedule courses
              this.scheduleCourses = semester.getScheduleCourses(this.schedule.courseCodes);
              return semester;
            });
      },
      default() {
        return Semester.makeEmpty();
      },
    },
  },
  // Called when the component is created
  created() {
    const vm = this;
    // AutoSave whenever the schedule changes
    this.$watch('schedule', () => {
      vm.autoSaveSchedule();
    }, { deep: true });
  },
  methods: {
    searchCourses: throttle(function search() {
      // Throttled to get rid of unnecessary filters when typing quickly
      // Update the list of filtered Courses
      return this.semester.courses.filter(
          course =>
          course.quickContains(this.courseQuery.toLowerCase(), this.showClosed));
    }, 250),
    // These are here if we want to do more explicit add/remove than dblclick
    addCourse(course) {
      this.schedule.addCourse(course);
      this.scheduleCourses.push(course);
    },
    removeCourse(course) {
      this.schedule.removeCourse(course);
      this.scheduleCourses.splice(this.scheduleCourses.indexOf(course), 1);
    },
    toggleCourse(course) {
      if (this.schedule.hasCourse(course)) {
        this.removeCourse(course);
      } else {
        this.addCourse(course);
      }

      // Set the preview to null if it was the course added
      if (course === this.previewCourse) {
        this.previewCourse = null;
      }
    },
    autoSaveSchedule: debounce(function save() {
      this.saveSchedule();
    }, 1000), // Save a max of once a second
    saveSchedule() {
      ApiService.updateSchedule(this.schedule)
          .then(() => {
            // Great
            console.log('Saved!');
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
          <input id="name" :value="schedule.name" v-model="schedule.name"/>
          <input id="notes" :value="schedule.notes" v-model="schedule.notes"/>
          <input class="course-search" type="text" placeholder="Search courses" v-model="courseQuery">
          
          <select class="course-selector" size="25" v-model="previewCourse">
              <option v-for="course in filteredSemesterCourses" :key="course.callNumber" :value="course"> 
              {{course.section}}: {{course.title}} 
              </option>
          </select>
          
          <label for="closedCheckbox">Show closed?</label>
          <input id="closedCheckbox" type="checkbox" v-model="showClosed">
      </section>  
    
      <section class="schedule-view">
        <course  v-for="course in scheduleCourses" :key="course.callNumber" :course="course"
            @dblclick.native="toggleCourse(course)"></course>
        <course class="preview" v-if="previewCourse" :course="previewCourse" 
            @dblclick.native="toggleCourse(previewCourse)"></course>
      </section>
    </div>
  </div>`,
});
