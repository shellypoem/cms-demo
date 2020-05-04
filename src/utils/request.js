/*
 * @Descripttion: AXIOS配置和封装
 * @Author: luqing Chen
 * @Date: 2020-05-03 22:35:02
 * @LastEditors: luqing Chen
 * @LastEditTime: 2020-05-04 00:16:01
 */
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/sessioncokie'
import errorCode from '@/const/errorCode'
import router from '@/router'

let baseURL
// 判断开发环境（一般用于本地代理）
if (process.env.NODE_ENV === 'development') {
  // 开发环境
  baseURL = '/'
} else {
  // 编译环境
  baseURL = window.Glod && window.Glod.BaseUrl // 在这里使用配置文件中的域名
}
const service = axios.create({
  baseURL: baseURL,
  timeout: 60000,
  contentType: 'application/jsoncharset=utf-8'
})

service.interceptors.request.use(
  config => {
    if (store.getters.token && store.getters.token !== 'admin-token') {
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// HTTPresponse拦截
service.interceptors.response.use(
  response => {
    console.log('response',response);
    const res = response.data
    const status = Number(res.status) || 200
    if (status === 401) {
      store.dispatch('user/logout').then(() => {
        router.push(`/login?redirect=${this.$route.fullPath}`)
      })
      return
    }
    const message =
      res.message ||
      res.msg ||
      errorCode[status] ||
      errorCode['default']
    /* 状态返回码正确 */
    if (res.code !== '200' && res.code !== 0) {
      // 或者为导出接口时
      if (response.headers['content-disposition']) {
        return res
      }
      /* 警告标示 是否进入确认强制存入 */
      if (res.code === '30001') {
        return res
      }
      if (res.access_token) {
        return res
      }
      Message({
        message: message,
        type: 'error'
      })
      return Promise.reject(new Error(message))
    }
    return res
  },
  error => {
    console.log('error',error);
    var originalRequest = error.config
    let message = error.message
    const requestTip = error.response.data.msg || error.response.data.message
    if (requestTip) {
      message = requestTip
    }
    if (
      error.code === 'ECONNABORTED' &&
      error.message.indexOf('timeout') !== -1 &&
      !originalRequest._retry
    ) {
      message = '请求超时，请检查网络'
    }
    if (error.request.status === 401) {
      message = '验证失效，请重新登录'
    }
    Message({
      message: message,
      type: 'error'
    })
    return Promise.reject(new Error(error))
  }
)

export default service
