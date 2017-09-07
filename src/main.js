import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import App from './App';
import router from './router/router.js';
import API from './api/API.js';
import './assets/css/common.css';
import './assets/css/flex.css';
import './assets/css/like.css';
import './assets/css/list.css';


Vue.use(ElementUI)
const api = new API();
Vue.prototype.api = api;

new Vue({
  el: '#app',
  API,
  router,
  template: '<App/>',
  components: { App }
})
