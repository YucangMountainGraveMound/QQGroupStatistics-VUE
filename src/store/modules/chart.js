import * as types from '../mutation-types'

const state = {
  message_count: [],
  word_cloud: [],
  message_count_by_day_of_week: [],
  active_day: [],
  image_count_user: [],
  word_cloud_count: 2
}

const mutations = {
  [types.SET_MESSAGE_COUNT](state, messageCount) {
    state.message_count = messageCount
  },
  [types.SET_WORD_CLOUD](state, wordCloud) {
    state.word_cloud = wordCloud
  },
  [types.SET_MESSAGE_COUNT_BY_DAY_OF_WEEK](state, messageCount) {
    state.message_count_by_day_of_week = messageCount
  },
  [types.SET_ACTIVE_DAY](state, data) {
    state.active_day = data
  },
  [types.SET_IMAGE_COUNT_USER](state, data) {
    state.image_count_user = data
  },
  [types.SET_WORD_CLOUD_COUNT](state, count) {
    state.word_cloud_count = count
  }
}

export default {
  state,
  mutations
}
