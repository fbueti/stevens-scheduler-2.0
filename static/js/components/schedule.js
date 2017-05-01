import Vue from '../VueSetup';
import styles from '../../scss/components/schedule.scss';

// Course component
import './course';

Vue.component('schedule', {
  template: '<div class="component-test">' +
  '<p>This is a styled test Schedule!</p>' +
  '<course></course>' +
  '</div>',
});
