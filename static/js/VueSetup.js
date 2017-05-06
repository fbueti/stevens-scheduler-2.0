/**
 * Created by austin on 5/1/17.
 */
import Vue from 'vue/dist/vue'; // Use dist/vue for the template compiler. In future --> precompile
import VueResource from 'vue-resource';
import AsyncComputed from 'vue-async-computed';
import VueMoment from 'vue-moment';

Vue.use(VueResource);
Vue.http.options.xhr = { withCredentials: true };
// Set the api as the root for all calls
Vue.http.options.root = '/api';

Vue.use(AsyncComputed);
Vue.use(VueMoment);

export default Vue;
