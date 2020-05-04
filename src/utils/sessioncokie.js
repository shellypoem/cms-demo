/*
 * @Descripttion: 
 * @Author: luqing Chen
 * @Date: 2020-05-03 23:21:43
 * @LastEditors: luqing Chen
 * @LastEditTime: 2020-05-03 23:21:47
 */

import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const keyName = 'vue_admin_key' + '-'

/**
 * 存储localStorage
 */
export function setStore(params = {}) {
  let {
    name
  } = params
  const { content, type } = params
  name = keyName + name
  const obj = {
    dataType: typeof (content),
    content: content,
    type: type,
    datetime: new Date().getTime()
  }
  if (type) window.sessionStorage.setItem(name, JSON.stringify(obj))
  else window.localStorage.setItem(name, JSON.stringify(obj))
}
/**
 * 获取localStorage
 */

export function getStore(params = {}) {
  let {
    name
  } = params
  const { debug } = params
  name = keyName + name
  let obj = {}
  let content
  obj = window.sessionStorage.getItem(name)
  if (!obj) obj = window.localStorage.getItem(name)
  if (!obj) return
  try {
    obj = JSON.parse(obj)
  } catch (e) {
    return obj
  }
  if (debug) {
    return obj
  }
  if (obj.dataType === 'string') {
    content = obj.content
  } else if (obj.dataType === 'number') {
    content = Number(obj.content)
  } else if (obj.dataType === 'boolean') {
    content = !!obj.content
  } else if (obj.dataType === 'object') {
    content = obj.content
  }
  return content
}
/**
 * 删除localStorage
 */
export function removeStore(params = {}) {
  let {
    name
  } = params
  const {
    type
  } = params
  name = keyName + name
  if (type) {
    window.sessionStorage.removeItem(name)
  } else {
    window.localStorage.removeItem(name)
  }
}

/**
 * 获取全部localStorage
 */
export function getAllStore(params = {}) {
  const list = []
  const {
    type
  } = params
  if (type) {
    for (let i = 0; i <= window.sessionStorage.length; i++) {
      list.push({
        name: window.sessionStorage.key(i),
        content: getStore({
          name: window.sessionStorage.key(i),
          type: 'session'
        })
      })
    }
  } else {
    for (let i = 0; i <= window.localStorage.length; i++) {
      list.push({
        name: window.localStorage.key(i),
        content: getStore({
          name: window.localStorage.key(i)
        })
      })
    }
  }
  return list
}

/**
 * 清空全部localStorage
 */
export function clearStore(params = {}) {
  const { type } = params
  if (type) {
    window.sessionStorage.clear()
  } else {
    window.localStorage.clear()
  }
}
