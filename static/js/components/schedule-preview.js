/**
 * Created by Gregory on 5/1/17.
 */
import Vue from '../VueSetup';
import Schedule from '../models/Schedule';
import ApiService from '../services/ApiService';

import '../../scss/components/schedule-preview.scss';

Vue.component('schedule-preview', {
  props: {
    schedule: {
      type: Schedule,
      required: true,
    },
    onDelete: {
      type: Function,
      required: false,
    },
  },
  template: `<div class="component-schedule-preview"> 
  <h2>{{schedule.name}}</h2> 
  <p>{{schedule.notes}}</p> 
  <a v-bind:href=" '/schedule/' + schedule.id">Edit</a> 
  <a @click="deleteSchedule">Delete</a> 
  </div>`,
  methods: {
    deleteSchedule() {
      ApiService.deleteSchedule(this.schedule)
          .then(() => {
            if (this.onDelete) {
              this.onDelete(this.schedule);
            }
          }).catch((error) => {
            console.error(error);
          });
    },
  },
});
