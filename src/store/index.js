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
  timeline: [],
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