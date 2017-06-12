import Vue from 'vue'

export default {

  topics(id) {
    return Vue.http.get('api/brands/'+id)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  brands() {
    return Vue.http.get('api/brands')
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  create(data) {
    return Vue.http.post('api/admin/brands', data)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  delete(id) {
    return Vue.http.delete('api/admin/brands/' + id)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

}