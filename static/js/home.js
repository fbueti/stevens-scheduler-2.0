/**
 * Created by austin on 4/30/17.
 */
import './main';
import Vue from './VueSetup';
import CourseService from './services/CourseService';
import ApiService from './services/ApiService';
// Components
import './components/course';
import './components/schedule-preview';
import './components/schedule';

// Styles
import '../scss/home.scss';

// CourseService.getTerms().then((res) => {
//   console.log(res);
// }).catch((err) => {
//   console.error(err);
// });
//
// CourseService.getSemesterByCode('2017F').then((sem) => {
//   console.log(sem);
// }).catch((err) => {
//   console.error(err);
// });

// Setup app

const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello from Vue!',
    schedule: null
  },
  // asyncComputed: {
  //   async semester() {
  //     return await CourseService.getSemester({code: '2017F'})
  //   }
  // }
});
