import Vue from 'vue'

export default {
  conversations () {
    return Vue.http.get('api/conversations')
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  messages (id) {
    return Vue.http.get('api/messages/' + id)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  sendMessage (data) {
    return Vue.http.post('api/messages', data)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }

}