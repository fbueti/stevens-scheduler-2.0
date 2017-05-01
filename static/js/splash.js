/**
 * Created by austin on 4/30/17.
 */
import './main';
import Vue from './VueSetup';
import CourseService from './services/CourseService';
import '../scss/splash.scss'

Vue.http.get('https://google.com').then((res) => {
  console.log(res);
}).catch((err) => {
  console.error(err);
});

CourseService.getTerms().then((res) => {
  console.log(res);
}).catch((err) => {
  console.err(err);
});
