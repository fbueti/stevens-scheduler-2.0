/**
 * Created by austin on 4/30/17.
 */
import './main';
import Vue from './VueSetup';
import CourseService from './services/CourseService';
import ApiService from './services/ApiService';
import $ from 'jquery';

// Components
import './components/Test';
// Styles
import '../scss/home.scss';

// Vue.http.get('https://google.com').then((res) => {
//   console.log(res);
// }).catch((err) => {
//   console.error(err);
// });

$.get('https://web.stevens.edu/scheduler/core/core.php?cmd=terms', (res) => {
  console.log(res);
});

CourseService.getTerms().then((res) => {
  console.log(res);
}).catch((err) => {
  console.error(err);
});

CourseService.getSemester('2017F').then((sem) => {
  console.log(sem);
}).catch((err) => {
  console.error(err);
});

// ApiService.deleteUser().then((res) => {
//
// }).catch((err) => {
//   console.error(err);
// });


// Setup app

const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello from Vue!',
  },
});
