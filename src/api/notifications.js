import Vue from 'vue'

export default {

  notifications() {
    return Vue.http.get('api/notifications')
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  update(id) {
    return Vue.http.put('api/notifications/'+id)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }

}