import Hashes from 'jshashes'

const MD5 = new Hashes.MD5

export default {
  encryptAuth(username, password) {
    return MD5.hex(MD5.hex(password) + username)
  }
}
