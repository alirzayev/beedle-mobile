import Vue from 'vue'

export default {
  authenticate (data) {
    return Vue.http.post('oauth/token', data)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  user () {
    return Vue.http.get('api/user')
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }
}