/*
 * @Descripttion:
 * @Author: luqing Chen
 * @Date: 2020-04-20 08:36:45
 * @LastEditors: luqing Chen
 * @LastEditTime: 2020-05-04 14:34:43
 */
import Vue from 'vue'
import Router from 'vue-router'
import viewRouter from './view/index'
import Layout from '@/layout/index/'
// import index from '@/components/HelloWorld'

Vue.use(Router)

const somerouter = [
  {
    component: Layout,
    path: '/',
    redirect: '/index',
    children: [{
      path: 'index',
      component: () => import('@/view/index/index')
    }]
  },
  {
    component: Layout,
    redirect: '/login',
    path: '/',
    children: [{
      path: 'login',
      component: () => import('@/view/login')
    }]
  }
]
const routes = viewRouter.concat(somerouter)
const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})

export default router
