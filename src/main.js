import Vue from 'vue';
import App from './App';
import router from './router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import store from './store';
import './mock/index.js';  // 该项目所有请求使用mockjs模拟
import './login.js' 
//import './ui.js' 
import axios from 'axios'
import qs from 'qs'
import AudioRecorder from 'vue-audio-recorder'

import svgJs from './utils/svg'
Vue.use(svgJs)

Vue.use(AudioRecorder)
Vue.use(iView);

Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
Vue.config.productionTip = false;
Vue.prototype.baseURL = process.env.BASE_API;
var vm=new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})


