import Vue from 'vue'
import * as types from './mutation-types'
import StoreCache from '../utils/storeCache'

let cache = new StoreCache('vuex')

export default {
  [types.INIT_USER_INFO] (state, {user}) {
    Vue.set(state, 'user', user)
  },
  [types.INIT_USERS] (state, {users}) {
    Vue.set(state, 'users', users)
  },
  [types.UPDATE_LANG] (state, lang) {
    Vue.set(state, 'lang', lang)
    cache.set('lang', lang)
  },
  [types.INIT_BRANDS] (state, {brands}) {
    Vue.set(state, 'brands', brands)
  },
  [types.INIT_MODELS] (state, {models}) {
    Vue.set(state, 'models', models)
  },
  [types.INIT_COMMENTS] (state, {comments}) {
    Vue.set(state, 'comments', comments)
  },
  [types.INIT_NOTIFICATIONS] (state, {notifications}) {
    Vue.set(state, 'notifications', notifications)
  },
  [types.INIT_CONTACTS] (state, {contacts}) {
    Vue.set(state, 'contacts', contacts)
  },
  [types.INIT_TOPICS] (state, {timeline}) {
    Vue.set(state, 'timeline', timeline)
  },
  [types.INIT_TRENDS] (state, {trends}) {
    Vue.set(state, 'trends', trends)
  },
  [types.INIT_MODEL_TRENDS] (state, {trends}) {
    Vue.set(state, 'trends', trends)
  },
  [types.INIT_MODEL_TOPICS] (state, {topics}) {
    Vue.set(state, 'timeline', topics)
  },
  [types.INIT_BRAND_TOPICS] (state, {topics}) {
    Vue.set(state, 'timeline', topics)
  },
  [types.INIT_FILTERED_TOPICS] (state, {topics}) {
    Vue.set(state, 'filteredData', topics)
  },
  [types.INIT_MESSAGES] (state, {messages}) {
    Vue.set(state, 'messages', messages)
  },
  [types.INIT_COUNTRIES] (state, {countries}) {
    Vue.set(state, 'countries', countries)
  },
  [types.INIT_CITIES] (state, {cities}) {
    Vue.set(state, 'cities', cities)
  }

}