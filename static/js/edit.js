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
  el: '#app',
  data: {

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
     saveCourse() {

     },
  },
});
