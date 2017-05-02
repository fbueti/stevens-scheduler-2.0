/**
 * Created by FRAN
 */

import Vue from '../VueSetup';
import '../../scss/components/course.scss';

Vue.component('course', {
  props: ['course'],
  template: '<div class="course">' +
  '<h3>{{course.title}}</h3>' +
  '<h4>{{course.section}}</h4>' +
  '<p>Call Number: {{course.callNumber}}</p>' +
  '<p>Spots Left: {{course.maxEnrollment - course.currentEnrollment}}</p>' +
  // '<p>Start: {{course.startDate | moment("dd H:mm")}}</p>' +
  '<p v-for="meeting in course.meetings">{{meeting.activity}}</p>' +
  '</div>',
});
