import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import Vue from '../VueSetup';
import ApiService from '../services/ApiService';
import CourseService from '../services/CourseService';
import Schedule from '../models/Schedule';
import Semester from '../models/Semester';
import { redirect } from '../utils';
// Components
import './course';
import './course-meeting';
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
    shownCourses() {
      // A hacky way to not have duplicates
      if (this.previewCourse && this.scheduleCourses.indexOf(this.previewCourse) === -1) {
        return this.scheduleCourses.concat(this.previewCourse);
      }
      return this.scheduleCourses;
    },
    shownWebCourses() {
      return this.shownCourses.filter(course => course.isWeb);
    },
    /**
     * All courses that have yet to be announced
     */
    shownTBACourses() {
      // Web courses will be handled differently
      return this.shownCourses.filter(course => course.isTBA && !course.isWeb);
    },
    filteredSemesterCourses() {
      if (this.courseQuery === '') return this.semester.courses; // If no search term
      return this.searchCourses();
    },
    loaded() {
      return (this.semester && this.semesterLoaded);
    },
    totalCredits() {
      return this.scheduleCourses.reduce(
          (total, course) => total + course.maxCredit,
          0);
    },
    totalShownCredits() {
      return this.shownCourses.reduce(
          (total, course) => total + course.maxCredit,
          0);
    },
  },
  asyncComputed: {
    semester: {
      get() {
        this.semesterLoaded = false;
        return CourseService.getSemesterByCode(this.schedule.termCode)
            .then((semester) => {
              this.semesterLoaded = true;
              // Load in the schedule courses
              this.scheduleCourses = semester.getScheduleCourses(this.schedule.courseCodes);
              return semester;
            })
            .catch((error) => {
              if (error && error.status && error.status === 500) {
                redirect('server-error');
              } else {
                console.error(error);
              }
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
    // EDITING functions
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
      if (!this.editable) return;
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
    async saveSchedule() {
      try {
        await ApiService.updateSchedule(this.schedule);
        // Great
        console.log('Saved!');
      } catch (error) {
        // Not Great
        console.error(error);
      }
    },
  },
  // Show semester course selection only if editable
  template: `<div :class="[{ editable }, 'component-schedule']">
    <div class="loading" v-if="!loaded">
        <spinner name="fading-circle"></spinner>
    </div>
    <div class="loaded" v-else>
      <section  v-if="editable" class="semester-courses">
          <section id="editable-info">
            <p> Schedule Title: </p>
            <input id="name" :value="schedule.name" v-model="schedule.name" placeholder="Title"/>
            <p> Schedule Description: </p>
            <input id="notes" :value="schedule.notes" v-model="schedule.notes" placeholder="Notes"/>
            <input class="course-search" type="text" placeholder="Search courses..." v-model="courseQuery">
          <div class="extra-info">
            <p>{{schedule.termCode}}</p>
            <label for="closedCheckbox">Show closed?</label>
            <input id="closedCheckbox" type="checkbox" v-model="showClosed">
            <p> Total Credits: {{ totalShownCredits }}</p>
            <!-- lol @ timely greg -->
            <button>Save</button>
          </div>
          </section>
          <select class="course-selector" size="25" v-model="previewCourse">
              <option v-for="course in filteredSemesterCourses" :key="course.callNumber" :value="course"> 
              {{course.section}}: {{course.title}} 
              </option>
          </select>
          
      </section>  
    
      <section class="schedule-view">      
      
      <!--<article class="tba-courses" v-if="shownTBACourses.length > 0">-->
        <!--<h2>TBA Courses</h2>-->
        <!--<template v-for="course in shownTBACourses">-->
          <!--<course-meeting v-for="meeting in course.meetings"-->
                    <!--:class="course === previewCourse ? 'preview' : ''"-->
                    <!--:positioned="false"-->
                    <!--:meeting="meeting" :course="course" :key="course.callNumber"-->
                    <!--@dblclick.native="toggleCourse(course)"></course-meeting>-->
        <!--</template>-->
      <!--</article>-->
      
        <div id="days">
          <p class="day"> Monday </p>
          <p class="day"> Tuesday </p>
          <p class="day"> Wednesday </p>
          <p class="day"> Thursday </p>
          <p class="day"> Friday </p>
        </div>
        <div id="times">
          <p> 8am </p>
          <p> 9am </p>
          <p> 10am </p>
          <p> 11am </p>
          <p> 12am </p>
          <p> 1pm </p>
          <p> 2pm </p>
          <p> 3pm </p>
          <p> 4pm </p>
          <p> 5pm </p>
          <p> 6pm </p>
          <p> 7pm </p>
          <p> 8pm </p>
        </div>
        
        <template v-for="course in shownCourses">
          <course-meeting v-for="meeting in course.meetings"
                    :class="course === previewCourse ? 'preview' : ''"
                    :meeting="meeting" :course="course" :key="course.callNumber"
                    @dblclick.native="toggleCourse(course)"></course-meeting>
        </template>
      </section>

      <article class="web-courses"  v-if="shownWebCourses.length > 0">
        <h2>Web Courses</h2>
        <template v-for="course in shownWebCourses">
          <course-meeting v-for="meeting in course.meetings"
                    :class="course === previewCourse ? 'preview' : ''"
                    :positioned="false"
                    :meeting="meeting" :course="course" :key="course.callNumber"
                    @dblclick.native="toggleCourse(course)"></course-meeting>
        </template>
      </article>
      
    </div>
  </div>`,
});
