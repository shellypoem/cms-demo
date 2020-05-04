/*
 * @Descripttion: 黑白名单
 * @Author: luqing Chen
 * @Date: 2020-04-14 14:20:06
 * @LastEditors: luqing Chen
 * @LastEditTime: 2020-05-04 00:13:16
 */
import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
const whiteList = ['/login'] // no redirect whitelist
import store from './store/index'
console.log('router',router);
router.beforeEach(async(to, from, next) => {
    NProgress.start()
    if (store.getters.loginstatus) {
        next()
        NProgress.done()
    } else {
      /* has no token*/
      if (whiteList.indexOf(to.path) !== -1) {
        next()// 白名单跳到当前页
        NProgress.done()
      } else {// 黑名单跳到登录页
        next(`/login`)
        NProgress.done()
      }
    }
  })
  
  router.afterEach(() => {
    NProgress.done()
  })