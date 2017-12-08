import Vue from 'vue'

export default {

  topics (id) {
    return Vue.http.get('api/models/' + id)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  trends (id) {
    return Vue.http.get('api/trends/' + id)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  models (id) {
    return Vue.http.get('api/models/?brand_id=' + id)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  create (data) {
    return Vue.http.post('api/admin/models/', data)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }

}