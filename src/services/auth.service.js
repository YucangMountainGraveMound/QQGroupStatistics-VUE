import axios from '../utils/request'
import encrypt from '../utils/encrypt'

export default {

  /**
   * 登录
   * @returns {Promise<any>}
   */
  login(credentials) {
    return new Promise((resolve, reject) => {
      if (!credentials.account || !credentials.password) {
        return reject(new Error('用户名或密码不能为空'))
      }

      axios.post('/login', {
        username: credentials.account,
        password: encrypt.encryptAuth(credentials.account, credentials.password)
      })
        .then(res => resolve(res.data.token))
        .catch(reject)
    })
  },

  /**
   * 获取用户信息
   * @returns {Promise<any>}
   */
  me() {
    return new Promise((resolve, reject) => {
      axios.get('/user/me')
        .then(res => resolve(res.data))
        .catch(reject)
    })
  },

  updatePassword(username, pwd) {
    return new Promise((resolve, reject) => {
      axios.put('/user/password', {
        new: encrypt.encryptAuth(username, pwd)
      })
        .then(resolve)
        .catch(reject)
    })
  }
}
