/*
 * @Descripttion: 
 * @Author: luqing Chen
 * @Date: 2020-05-03 17:51:29
 * @LastEditors: luqing Chen
 * @LastEditTime: 2020-05-04 00:38:19
 */
import { login, logout, getInfo ,ApiDddLoginLog, ApiUpdateLoginLog} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/sessioncokie'
const state={
    token: getToken(),
    loginstatus:false,

}
const mutations = {//直接赋值
    SET_TOKEN: (state, token) => {
        state.token = token
      },
    SET_LOGINSTATUS: (state, status) => {
      state.loginstatus = status
      console.log('state.loginstatusmu',state.loginstatus);
    }
}
const actions={//赋值前的许多操作
    login({ commit }, userInfo) {
        const { name, password } = userInfo
        return new Promise((resolve, reject) => {
          if(name==='123'&&password==='123'){
            commit("SET_LOGINSTATUS",true)
                console.log('state.loginstatusac',state.loginstatus);
            resolve()
          }else{
            reject("账号密码错误")
          }
          login({ username: name.trim(), password: password }).then(response => {
            console.log('111',111);
            ApiDddLoginLog({
              loginAccount: userInfo.name
            }).then(() => {
                
              resolve()
            })
            commit('SET_TOKEN', response.access_token)
            setToken(response.access_token)
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
          getInfo(state.token).then(response => {
            const { data } = response
            if (!data) {
              reject('Verification failed, please Login again.')
            }
            console.log('commit',commit);
            // commit('SET_USER_INFO', data.sysUser)
            // commit('SET_ROLES', data.roles || [])
            // commit('SET_PERMISSIONS', data.permissions || [])
            resolve(data)
          }).catch(error => {
            reject(error)
          })
        })
      },
      async logout({ commit, state }) {
        await ApiUpdateLoginLog({
          loginId: localStorage.getItem('loginId')
        })
        return new Promise((resolve, reject) => {
          logout(state.token).then(() => {
            commit('SET_TOKEN', '')
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
    
      resetToken({ commit }) {
        return new Promise(resolve => {
          commit('SET_TOKEN', '')
          removeToken()
          resolve()
        })
      }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  