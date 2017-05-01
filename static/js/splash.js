/**
 * Created by austin on 4/30/17.
 */
import Vue from 'vue';
import './main';

Vue.http.get('https://google.com').then((res) => {
  console.log(res);
}).catch((err) => {
  console.error(err);
});
