/**
 * Created by austin on 4/30/17.
 */
import './main';
import Vue from './VueSetup';
import CourseService from './services/CourseService';
import ApiService from './services/ApiService';
// Components
import './components/Test';
// Styles
import '../scss/home.scss';

CourseService.getTerms().then((res) => {
  console.log(res);
}).catch((err) => {
  console.error(err);
});

CourseService.getSemesterByCode('2017F').then((sem) => {
  console.log(sem);
}).catch((err) => {
  console.error(err);
});


// Setup app

const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello from Vue!',
  },
});
