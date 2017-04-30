// This is where all the javascript for all pages should be put
// Vue setup, logout stuff, etc
import '../scss/main.scss';
import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);
Vue.http.options.xhr = { withCredentials: true };
