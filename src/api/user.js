import Vue from 'vue'

export default {

  users () {
    return Vue.http.get('api/users')
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  user (id) {
    return Vue.http.get('api/users/' + id)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  register (data) {
    return Vue.http.post('api/register', data)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  update (id, data) {
    return Vue.http.post('api/users/' + id + '/update', data)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  report (data) {
    return Vue.http.post('api/report/users', data)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }
}