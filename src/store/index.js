import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
import StoreCache from '../utils/storeCache'
import auth from './modules/authUser'

Vue.use(Vuex)
let cache = new StoreCache('vuex')

const state = {
  user: {},
  lang: cache.get('lang') || 'en',
  contacts: [],
  brands: [],
  users: [],
  timeline: [],
  filteredData: [],
  trends: [],
  comments: [],
  notifications: [],
  messages: [],
}

export default new Vuex.Store({
  modules: {
    auth
  },
  state,
  getters,
  actions,
  mutations
})