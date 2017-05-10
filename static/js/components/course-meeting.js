/**
 * Created by austin on 5/7/17.
 */
/* eslint-plugin-disable react */
import moment from 'moment';
import Vue from '../VueSetup';
import Course from '../models/Course';
import Meeting from '../models/Meeting';

// Styles
import '../../scss/components/course-meeting.scss';

// every hour is 75 pixels in the grid
const PX_PER_HOUR = 75;
// Day row header
const DAY_HEADER_HEIGHT_PX = 40;
const SCHEDULE_START_DURATION = moment.duration('8:00:00');

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
    return {
      hoursSinceStart: this.meeting.startDuration
          .subtract(SCHEDULE_START_DURATION).humanize(true),
    };
  },
  computed: {
    styles() {
      return {
        height: this.height,
        'margin-top': this.marginTop,
      };
    },
    dayClass() {
      return this.meeting.day;
    },
    marginTop() {
      if (!this.meeting.hasMeetings) {
        return 0;
      }

      // Todo: Something is not stored correctly in the startTime @Stevens
      // They seem to go back and forth between military time and am/pm
      const hoursSinceStart = this.meeting.startDuration
          .subtract(SCHEDULE_START_DURATION)
          .asHours();
      return `${(PX_PER_HOUR * hoursSinceStart) + DAY_HEADER_HEIGHT_PX}px`;
    },
    height() {
      if (!this.meeting.hasMeetings) {
        return 0;
      }
      return `${PX_PER_HOUR * this.meeting.duration.asHours()}px`;
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
    <div :class="[dayClass, 'component-course-meeting']" :style="styles" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
      <h3>{{ course.title }}</h3>
      <h4>{{ course.section }}</h4>
      <h5> {{ hoursSinceStart }}</h5>
      <p>Credits: {{ course.maxCredits }}</p>
      <p>Call Number: {{ course.callNumber }}</p>
      <p>Spots Left: {{ course.maxEnrollment - course.currentEnrollment }}</p>
    </div>
`,
});