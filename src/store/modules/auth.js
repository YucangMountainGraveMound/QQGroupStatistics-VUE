import * as types from '../mutation-types'

const state = {
  user: {},
  token: '',
  password_ignore: false
}

const mutations = {
  [types.SET_USER](state, user) {
    state.user = user
  },
  [types.SET_AUTH_TOKEN](state, token) {
    state.token = token
  },
  [types.REMOVE_AUTH_TOKEN](state) {
    state.token = ''
  },
  [types.PASSWORD_IGNORE](state, bool) {
    state.password_ignore = bool
  }
}

export default {
  state,
  mutations
}
