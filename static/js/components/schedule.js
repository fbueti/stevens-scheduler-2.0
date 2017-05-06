import Vue from '../VueSetup';
import '../../scss/components/schedule.scss';

import ApiService from '../services/ApiService';
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
  data() {
    return {
      coursePreviews: [],
      semesterLoaded: false,
    };
  },
  computed: {
    scheduleCourses() {
      // Map over the courses in the semester, pulling by course.callNumber == courseCode
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
    addCourse(course) {
      this.schedule.addCourse(course);
    },
    removeCourse(course) {
      this.schedule.removeCourse(course);
    },
    previewCourse(course) {
      // Show the course on the schedule-view but don't add it
      this.coursePreviews.push(course);
    },
    removePreview(course) {
      this.coursePreviews.splice(this.coursePreviews.indexOf(course), 1);
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
  // Show semester course selection only if editable
  template: `<div class="component-schedule"> 
    <div class="loading" v-if="!loaded">
    Loading!
    </div>
    <div class="loaded" v-else>
    Loaded!
    <section  v-if="editable">
   <button @click="saveSchedule" class="btn-save-schedule">Save</button>
    <input class="course-search" type="text">
    <article class="course-selector">
        <div @click="previewCourse(course)" v-for="course in semester.courses" :key="course.callNumber"> 
        {{course.title}} {{course.section}} 
        </div>
    </article>
  </section>  
  
  <section class="schedule-view">
    <course  v-for="course in scheduleCourses" :key="course.callNumber"></course>
    <course class="preview" v-for="course in coursePreviews" :key="course.callNumber"></course>
    
  </section>
</div>
  </div>`,
});
