/**
 * Created by Gregory on 5/1/17.
 */
import Vue from '../VueSetup';
import Schedule from '../models/Schedule';

import '../../scss/components/schedule-preview.scss';

Vue.component('schedule-preview', {
  props: {
    schedule: {
      type: Schedule,
      required: true,
    },
  },
  template: '<div class="component-schedule-preview">' +
  '<h2>{{schedule.name}}</h2>' +
  '<p>{{schedule.notes}}</p>' +
  '<a v-bind:href="`/schedule/${schedule.id}`">Edit</a>' +
  // '<a v-bind:href="/schedules/schedule.id">Delete</a>' +
  '</div>',
});
