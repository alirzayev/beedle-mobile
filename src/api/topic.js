import Vue from 'vue'

export default {

  topics () {
    return Vue.http.get('api/topics')
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  trends () {
    return Vue.http.get('api/trends')
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  show (id) {
    return Vue.http.get('api/topics/' + id)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  create (data) {
    return Vue.http.post('api/topics', data)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  delete (id) {
    return Vue.http.delete('api/topics/' + id)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  like (id) {
    return Vue.http.post('api/like/' + id)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  dislike (id) {
    return Vue.http.post('api/remove-like/' + id)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  report (data) {
    return Vue.http.post('api/report/topics', data)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }
}