/*
 * @Descripttion: 
 * @Author: luqing Chen
 * @Date: 2020-05-03 16:04:14
 * @LastEditors: luqing Chen
 * @LastEditTime: 2020-05-04 00:41:59
 */
import Layout from '@/layout/index/'
export const personCenterRouter=[
    {
        path: '/personCenter',
        component: Layout,
        redirect: '/personCenter/index',
        children: [
          {
            path: 'index',
            name: '个人中心',
            component: () =>
              import('@/view/personCenter/index')
          }
        ]
      }
    ]