// This is where all the javascript for all pages should be put
// Vue setup, logout stuff, etc


Vue.use(VueResource);
Vue.http.options.xhr = { withCredentials: true };
// Vue.http.headers.xhr['Access-Control-Allow-Credentials'] = true;
// Vue.http.headers.xhr['Access-Control-Allow-Origin'] = 'http://localhost:3000';
// Vue.http.headers.common['Access-Control-Request-Method'] = '*';