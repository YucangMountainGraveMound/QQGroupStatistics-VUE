import * as types from '../mutation-types'

const state = {
  time_gte: '',
  time_lte: '',
  window_inner_width: window.innerWidth,
  menu_collapse: false,
}

const mutations = {
  [types.SET_TIME_GTE](state, time) {
    state.time_gte = time
  },
  [types.SET_TIME_LTE](state, time) {
    state.time_lte = time
  },
  [types.SET_MENU_COLLAPSE](state, collapse) {
    state.menu_collapse = collapse
  },
  [types.SET_WINDOW_INNER_WIDTH](state, width) {
    state.window_inner_width = width
  }
}

export default {
  state,
  mutations
}
