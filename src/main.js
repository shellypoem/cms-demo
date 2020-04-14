/*
 * @Descripttion: 
 * @Author: luqing Chen
 * @Date: 2020-04-14 10:35:13
 * @LastEditors: luqing Chen
 * @LastEditTime: 2020-04-14 19:33:17
 */
import Vue from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'
Vue.config.productionTip = false
import VuePreview from 'vue-preview';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import router from './router'

import '@/permission' // permission control
Vue.use(ElementUI);
Vue.use(VuePreview);
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
