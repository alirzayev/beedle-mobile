import Vue from 'vue'

export default {

  countries () {
    return Vue.http.get('api/countries')
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

  cities (code) {
    return Vue.http.get('api/cities/' + code)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },

}