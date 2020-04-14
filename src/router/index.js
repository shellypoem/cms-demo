/*
 * @Descripttion: 
 * @Author: luqing Chen
 * @Date: 2020-04-14 19:39:40
 * @LastEditors: luqing Chen
 * @LastEditTime: 2020-04-14 19:44:19
 */
/*
 * @Description: 路由管理表
 * @Autor: zhan
 * @Date: 2019-08-02 15:51:47
 * @LastEditors: zhan
 * @LastEditTime: 2020-04-13 16:22:45
 */
import Vue from 'vue'
import Router from 'vue-router'
import { formatRoutes } from './formartterRouter'
import { getStore } from '@/utils/store'
import ViewsRouter from './views/'
Vue.use(Router)
/* Layout */
import Layout from '@/layout'
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/lock',
    name: '锁屏页',
    component: () =>
        import(/* webpackChunkName: "page" */ '@/page/lock/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: '首页',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'home', noCache: true, affix: true }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const menuList = getStore({ name: 'menu' })
const routerData = formatRoutes(menuList, true)
const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: []
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
  const menuRouter = ViewsRouter.concat(routerData).concat(constantRoutes)
  menuRouter.forEach((item, index) => {
    if (!item) {
      menuRouter.splice(index, 1)
    }
  })
  router.addRoutes(menuRouter)
}

resetRouter()

export default router
