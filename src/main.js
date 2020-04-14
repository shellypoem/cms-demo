/*
 * @Descripttion: 
 * @Author: luqing Chen
 * @Date: 2020-04-14 10:35:13
 * @LastEditors: luqing Chen
 * @LastEditTime: 2020-04-14 14:21:02
 */
import Vue from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'
Vue.config.productionTip = false
import VuePreview from 'vue-preview';
Vue.use(VuePreview);
new Vue({
  render: h => h(App),
}).$mount('#app')
