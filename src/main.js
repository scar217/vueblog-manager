import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import "./axios"
import "./permission"
import echarts from 'echarts'
Vue.use(ElementUI);
Vue.use(mavonEditor)
Vue.config.productionTip = false
Vue.prototype.$axios = axios  //全局使用axios
Vue.prototype.$echarts = echarts


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
