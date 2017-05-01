/**
 * Created by austin on 5/1/17.
 */
import Vue from '../VueSetup';
import styles from '../../scss/components/test.scss';

Vue.component('test', {
  template: '<div class="component-test">' +
  '<p>This is a styled test Component!</p>' +
  '</div>',
});
