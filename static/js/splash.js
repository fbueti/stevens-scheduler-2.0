/**
 * Created by austin on 4/30/17.
 */
import './main';

import Vue from 'vue';

const t = document.getElementById('test');
t.innerText = 'test';

Vue.http.get('https://google.com').then((res) => {
  console.log(res);
  alert(res);
});
