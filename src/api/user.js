/*
 * @Descripttion: user
 * @Author: luqing Chen
 * @Date: 2020-05-03 23:34:25
 * @LastEditors: luqing Chen
 * @LastEditTime: 2020-05-03 23:39:33
 */
import request from '@/utils/request'

/**
 * @description: 用户名 密码登录
 * @param {type} post
 * @return: json
 * @author: zhan
 */
const scope = 'server'
export const login = ({ username, password }) => {
  const grant_type = 'password'
  return request({
    url: '/auth/oauth/token',
    headers: {
      'isToken': false,
      'TENANT-ID': '1',
      'Authorization': 'Basic ZW1wOmVtcA=='
    },
    method: 'post',
    params: { username, password, grant_type, scope }
  })
}
/**
 * @description: 获取用户数据
 * @param {type} get
 * @return: json
 * @author: zhan
 */
export function getInfo(token) {
  return request({
    url: '/admin/user/info',
    method: 'get',
    params: { token }
  })
}
/**
 * @description: 退出登录
 * @param {type} post
 * @return: json
 * @author: zhan
 */
export function logout() {
  return request({
    url: '/auth/token/logout',
    method: 'delete'
  })
}
/**
 * @description:
 * @param {type} 登出更新用户登录记录
 * @return: json
 * @author: zhan
 */
export async function ApiUpdateLoginLog(params) {
    return request({
      url: '/basic/loginLog/updateLoginLog',
      method: 'post',
      data: params
    })
  }
  /**
 * @description:
 * @param {type} 添加用户登录记录
 * @return: json
 * @author: zhan
 */
export async function ApiDddLoginLog(params) {
    return request({
      url: '/basic/loginLog/addLoginLog',
      method: 'post',
      data: params
    })
  }
