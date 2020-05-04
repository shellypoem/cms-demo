/*
 * @Descripttion: 
 * @Author: luqing Chen
 * @Date: 2020-04-20 08:36:45
 * @LastEditors: luqing Chen
 * @LastEditTime: 2020-05-03 19:50:22
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getter'
Vue.use(Vuex)
const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
    modules,
    getters
})

export default store
