// This is the common chuck


Vue.use(VueResource);
Vue.http.options.xhr = { withCredentials: true };
// Vue.http.headers.xhr['Access-Control-Allow-Credentials'] = true;
// Vue.http.headers.xhr['Access-Control-Allow-Origin'] = 'http://localhost:3000';
// Vue.http.headers.common['Access-Control-Request-Method'] = '*';