/**
 * Created by austin on 5/7/17.
 */
/* eslint-plugin-disable react */

import Vue from '../VueSetup';
import Course from '../models/Course';
import Meeting from '../models/Meeting';

// Styles
import '../../scss/components/course-meeting.scss';


/**
 * A course meeting
 * Todo: How to position this on the schedule?
 */
Vue.component('course-meeting', {
  props: {
    meeting: { type: Meeting, required: true, },
    course: { type: Course, required: true }
  },
  data() {
    return { isHovering: false };
  },
  computed: {
    styles() {
      return {
        height: this.height,
        'margin-top': this.marginTop,
        'margin-left': this.marginLeft,
      };
    },
    dayClass() {
      return this.meeting.day;
    },
    marginTop() {
      // 40 px for the day header

    },
    marginLeft() {
      // 50 px for the hour column
      const parentWidth = this.$parent.$el.offsetWidth;
      switch(this.meeting.day) {
        case 'M':
      }
    },
    height() {
      // every hour is 75 pixels
      // duration
      if (!this.meeting.hasMeetings) {
        return 0;
      }
      return `${75 * this.meeting.duration.asHours()}px`;
    }
  },
  methods: {
    mouseEnter() {
      this.isHovering = true;
    },
    mouseLeave() {
      this.isHovering = false;
    }
  },
  template: `
    <div :class="[{ hover: isHovering }, dayClass, 'component-course-meeting']" :style="styles" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <h3>{{ course.title }}</h3>
    <h4>{{ course.section }}</h4>
    <h5> {{ meeting.day }}</h5>
    <p>Credits: {{ course.maxCredits }}</p>
    <p>Call Number: {{ course.callNumber }}</p>
    <p>Spots Left: {{ course.maxEnrollment - course.currentEnrollment }}</p>
    </div>
`,
  // Written using the Vue-jsx loader style
  // render() {
  //   return (<div class={[{ isHovering: 'isHovering' }, 'component-course-meeting']}
  //                onMouseEnter={this.mouseEnter}
  //                onMouseLeave={this.mouseLeave}>
  //     <h3>{ this.course.title }</h3>
  //     <h4> { this.course.section }</h4>
  //     <p>Credits: { this.course.maxCredits }</p>
  //     <p>Call Number: { this.course.callNumber }</p>
  //     <p>Spots Left: { this.course.maxEnrollment - this.course.currentEnrollment }</p>
  //     { this.course.meetings.map(meeting => <p> { meeting.activity }</p>) }
  //   </div>);
  // },
});