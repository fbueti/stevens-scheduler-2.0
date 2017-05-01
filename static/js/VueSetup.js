/**
 * Created by austin on 5/1/17.
 */
import Vue from 'vue/dist/vue'; // Use dist/vue for the template compiler. In future --> precompile
import VueResource from 'vue-resource';

Vue.use(VueResource);
Vue.http.options.xhr = { withCredentials: true };

export default Vue;
