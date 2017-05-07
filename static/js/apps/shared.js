/**
 * Created by austin on 4/30/17.
 */
/* eslint-plugin-disable react */
import './main';
import Vue from '../VueSetup';
import Schedule from '../models/Schedule';

// Components
import '../components/schedule';

// Styles
import '../../scss/shared.scss';

const app = new Vue({
  data() {
    // Make a new Schedule from the url
    return {
      schedule: Schedule.makeFromHash(window.location.search)
    };
  },
  render() {
    return (<schedule schedule={this.schedule} editable={false}/>);
  }
});

app.$mount('#app');
