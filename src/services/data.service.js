import axios from '@/utils/request'

export default {

  messageCount() {
    return new Promise((resolve, reject) => {
      axios.get("/message/user").then(res => {
        if (res) resolve(res.data.buckets)
      }).catch(reject)
    })
  },

  wordCloud(count) {
    return new Promise((resolve, reject) => {
      axios.get("/frequency/word?word_num=" + count).then(res => {
        if (res) resolve(res.data.buckets)
      }).catch(reject)
    })
  },

  messageCountByDayOfWeek() {
    return new Promise((resolve, reject) => {
      axios.get("/message/specific_time").then(res => {
        if (res) resolve(res.data.buckets)
      }).catch(reject)
    })
  },

  activeDay() {
    return new Promise((resolve, reject) => {
      axios.get("/histogram/active_day").then(res => {
        if (res) resolve(res.data.buckets)
      }).catch(reject)
    })
  },

  messageTerms(type) {
    return new Promise((resolve, reject) => {
      axios.get('/message/terms?key=' + type).then(res => {
        if (res) resolve(res.data.buckets)
      }).catch(reject)
    })
  },

  imageCountWithUser() {
    return new Promise((resolve, reject) => {
      axios.get('/image/count_user').then(res => {
        if (res) resolve(res.data.buckets)
      }).catch(reject)
    })
  },

  relationAt() {
    return new Promise((resolve, reject) => {
      axios.get('/relation/at').then(res => {
        if (res) resolve(res)
      }).catch(reject)
    })
  },

  messageHabit() {
    return new Promise((resolve, reject) => {
      axios.get('/message/habit').then(res => {
        if (res) resolve(res)
      }).catch(reject)
    })
  },

  dict(key) {
    return new Promise((resolve, reject) => {
      axios.get('/settings/dict?key=' + key).then(res => {
        if (res) resolve(res)
      }).catch(reject)
    })
  }
}
