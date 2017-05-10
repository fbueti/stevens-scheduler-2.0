/**
 * Created by Gregory on 5/1/17.
 */
import 'font-awesome-webpack';
import vmodal from 'vue-js-modal';
import Vue from '../VueSetup';
import Schedule from '../models/Schedule';
import ApiService from '../services/ApiService';

import { redirect } from '../utils';

import '../../scss/components/schedule-preview.scss';

Vue.use(vmodal);

Vue.component('schedule-preview', {
  props: {
    schedule: {
      type: Schedule,
      required: true,
    },
    // Function that takes the deleted schedule
    onDelete: {
      type: Function,
      required: false,
    },
  },
  template: `<div class="component-schedule-preview"> 
  <h2>{{schedule.name}}</h2> 
  <p>{{schedule.notes}}</p> 
  <i class="fa fa-paper-plane" aria-hidden="true" @click="shareSchedule"></i>
  <a v-bind:href=" '/edit/' + schedule.id">Edit</a> 
  <a @click="deleteSchedule">Delete</a> 
  
  <modal name="share-modal">
  
  </modal>
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
    shareSchedule() {
      this.$modal.show('share-modal');
    },
    editSchedule() {
      redirect(`edit/${this.schedule.id}`);
    },
  },
});
