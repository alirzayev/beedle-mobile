import Vue from 'vue'

export default {

  topics() {
    return Vue.http.get('api/topics')
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  trends() {
    return Vue.http.get('api/topics/trends')
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  show(id) {
    return Vue.http.get('api/topics/' + id)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  create(data) {
    return Vue.http.post('api/topics', data)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  delete(id) {
    return Vue.http.delete('api/admin/brands/' + id)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  like(id) {
    return Vue.http.post('api/topics/' + id + '/like')
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  dislike(id) {
    return Vue.http.post('api/topics/' + id + '/remove-like')
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }

}