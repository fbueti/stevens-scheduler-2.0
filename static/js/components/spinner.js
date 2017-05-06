/**
 * Created by austin on 5/6/17.
 */
import Vue from '../VueSetup';
import '../../scss/components/spinner.scss';

Vue.component('spinner', {
  props: {
    name: {
      type: String,
      default: 'cube-grid',
    },
  }, // Todo: support more spinners
  template: `<div class="component-spinner">
    <template v-if="name == 'cube-grid'">
      <div class="sk-cube-grid">
        <div class="sk-cube sk-cube1"></div>
        <div class="sk-cube sk-cube2"></div>
        <div class="sk-cube sk-cube3"></div>
        <div class="sk-cube sk-cube4"></div>
        <div class="sk-cube sk-cube5"></div>
        <div class="sk-cube sk-cube6"></div>
        <div class="sk-cube sk-cube7"></div>
        <div class="sk-cube sk-cube8"></div>
        <div class="sk-cube sk-cube9"></div>
      </div>
    </template>
    <template v-else-if="name == 'wave'">
      <div class="sk-wave">
        <div class="sk-rect sk-rect1"></div>
        <div class="sk-rect sk-rect2"></div>
        <div class="sk-rect sk-rect3"></div>
        <div class="sk-rect sk-rect4"></div>
        <div class="sk-rect sk-rect5"></div>
      </div>
    </template>
  </div>
  `,
});
