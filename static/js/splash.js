/**
 * Created by austin on 4/30/17.
 */
import Vue from 'vue';
import './main';

const t = document.getElementById('test');
t.innerText = 'test';

Vue.http.get('https://google.com').then((res) => {
  console.log(res);
  alert(res);
});
