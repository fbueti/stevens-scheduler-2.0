/**
 * Created by FRAN
 */
/* eslint-plugin-disable react */

import Vue from '../VueSetup';
import '../../scss/components/course.scss';

// Written using the Vue-jsx loader style
/**
 * A course
 */
Vue.component('course', {
  props: ['course'],
  render() {
    return (<div class="component-course">
      <h3>{ this.course.title }</h3>
      <h4> { this.course.section }</h4>
      <p>Credits: { this.course.maxCredits }</p>
      <p>Call Number: { this.course.callNumber }</p>
      <p>Spots Left: { this.course.maxEnrollment - this.course.currentEnrollment }</p>
      { this.course.meetings.map(meeting => <p> { meeting.activity }</p>) }
    </div>);
  },
});
