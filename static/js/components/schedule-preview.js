/**
 * Created by Gregory on 5/1/17.
 */
import 'font-awesome-webpack';
import vmodal from 'vue-js-modal';
import VueClipboard from 'vue-clipboards';
import Vue from '../VueSetup';
import Schedule from '../models/Schedule';
import ApiService from '../services/ApiService';

import { redirect, makeUrl } from '../utils';

import '../../scss/components/schedule-preview.scss';

Vue.use(vmodal);
Vue.use(VueClipboard);

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
  data() {
    return {};
  },
  computed: {
    shareUrl() {
      return makeUrl(`shared?${this.schedule.hash()}`);
    }
  },
  methods: {
    // So the modal name doesn't leak into global scope
    prefixName(name) {
      return `${name}#${this.schedule.id}`;
    },
    deleteSchedule(event) {
      event.stopPropagation();
      this.$modal.show(this.prefixName('delete-modal'));
    },
    deleteCanceled(event) {
      event.stopPropagation();
      this.$modal.hide(this.prefixName('delete-modal'));
    },
    async deleteConfirmed(event) {
      event.stopPropagation();
      try {
        await ApiService.deleteSchedule(this.schedule);
      } catch (error) {
        console.error(error);
      }

      if (this.onDelete) {
        this.onDelete(this.schedule);
      }
      this.$modal.hide(this.prefixName('delete-modal'));
    },
    shareSchedule(event) {
      event.stopPropagation();
      this.$modal.show(this.prefixName('share-modal'));
    },
    stopClickProp(event) {
      event.stopPropagation();
    },
    closeShare(event) {
      event.stopPropagation();
      this.$modal.hide(this.prefixName('share-modal'));
    },
    editSchedule(event) {
      event.stopPropagation();
      redirect(`edit/${this.schedule.id}`);
    },
  },
  template: `<div class="component-schedule-preview"> 
  <h2>{{schedule.name}}</h2> 
  <p>{{schedule.notes}}</p> 
  <div id="actions">
    <a @click="shareSchedule">Share</a> | 
    <a @click="editSchedule">Edit</a> | 
    <a @click="deleteSchedule">Delete</a> 
  </div>
  <modal :adaptive="true" :name="prefixName('share-modal')" @click.native="stopClickProp">
    <a :href="shareUrl">{{shareUrl}}</a>
    <button v-clipboard:copy="shareUrl" @click="stopClickProp">Copy to Clipboard</button>
    <button @click="closeShare">Close</button>
  </modal>
  <modal :name="prefixName('delete-modal')" @click.native="stopClickProp">
    <h1>Really delete {{schedule.name}}?</h1>
    <button @click="deleteCanceled">Cancel</button>
    <button @click="deleteConfirmed">Delete</button>
  </modal>
  </div>`,
});
