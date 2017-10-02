import Vue from 'vue'

export default {

  create (data) {
    return Vue.http.post('api/interests', data)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  delete (id) {
    return Vue.http.delete('api/interests/' + id)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

}