import * as types from './mutation-types'
import authService from '@/services/auth.service'
import dataService from '@/services/data.service'
import {setStore} from "@/utils/localStorage"

export const authLogin = ({commit}, credentials) => {
  return new Promise((resolve, reject) => {
    authService.login(credentials)
      .then(res => {
        setStore('token', res)
        fetchSuccess(commit, types.SET_AUTH_TOKEN, res)
        authService.me()
          .then(res => {
            fetchSuccess(commit, types.SET_USER, res)
            resolve(res)
          })
          .catch(resolve)
      })
      .catch(err => {
        setStore('token', '')
        if (err && err.response && err.response.status === 401) {
          reject(new Error('没登录成功啊，检查下账号密码吧'))
        } else {
          reject(err)
        }
      })
  })
}

export const authUser = ({commit}) => {
  authService.me()
    .then(res => {
      fetchSuccess(commit, types.SET_USER, res)
    })
}

export const authLogout = ({commit}) => {
  commit(types.REMOVE_AUTH_TOKEN)
  setStore('token', '')
}

export const authUpdatePassword = ({state, commit}, pwd) => {
  return new Promise((resolve, reject) => {
    authService.updatePassword(state.auth.user.account, pwd)
      .then(resolve)
      .catch(reject)
  })
}

export const getMessageCount = () => {
  return new Promise((resolve, reject) => {
    dataService.messageCount()
      .then(resolve)
      .catch(reject)
  })
}

export const getWordCloud = ({}, count) => {
  return new Promise((resolve, reject) => {
    dataService.wordCloud(count)
      .then(resolve)
      .catch(reject)
  })
}

export const getMessageCountByDayOfWeek = () => {
  return new Promise((resolve, reject) => {
    dataService.messageCountByDayOfWeek()
      .then(resolve)
      .catch(reject)
  })
}

export const getActiveDay = () => {
  return new Promise((resolve, reject) => {
    dataService.activeDay()
      .then(resolve)
      .catch(reject)
  })
}

export const getMessageTerms = ({commit}, type) => {
  return new Promise((resolve, reject) => {
    dataService.messageTerms(type)
      .then(resolve)
      .catch(reject)
  })
}

export const getImageCountWithUser = ({commit}) => {
  dataService.imageCountWithUser()
    .then(res => fetchSuccess(commit, 'SET_IMAGE_COUNT_USER', res))
    .catch(fetchFailed)
}

export const getRelationAt = () => {
  return new Promise((resolve, reject) => {
    dataService.relationAt()
      .then(resolve)
      .catch(reject)
  })
}

export const getMessageHabit = () => {
  return new Promise((resolve, reject) => {
    dataService.messageHabit()
      .then(resolve)
      .catch(reject)
  })
}

export const getDict = ({}, key) => {
  return new Promise((resolve, reject) => {
    dataService.dict(key)
      .then(resolve)
      .catch(reject)
  })
}

function fetchSuccess(commit, type, res) {
  commit(type, res)
}

function fetchFailed(err) {
  return new Promise((reject) => {
    reject(err)
  })
}
