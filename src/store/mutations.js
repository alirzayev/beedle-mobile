import Vue from 'vue'
import * as types from './mutation-types'
import StoreCache from '../utils/storeCache'
import find from 'lodash/find'

let cache = new StoreCache('vuex')

export default {
  [types.INIT_USER_INFO] (state, { user }) {
    Vue.set(state, 'user', user)
  },
  [types.INIT_USERS] (state, { users }) {
    Vue.set(state, 'users', users)
  },
  [types.UPDATE_LANG] (state, lang) {
    Vue.set(state, 'lang', lang)
    cache.set('lang', lang)
  },
  [types.INIT_BRANDS] (state, { brands }) {
    Vue.set(state, 'brands', brands)
  },
  [types.INIT_COMMENTS] (state, { comments }) {
    Vue.set(state, 'comments', comments)
  },
  [types.INIT_NOTIFICATIONS] (state, { notifications }) {
    Vue.set(state, 'notifications', notifications)
  },
  [types.INIT_CONTACTS] (state, { contacts }) {
    Vue.set(state, 'contacts', contacts)
  },
  [types.INIT_TIMETIME] (state, { timeline }) {
    Vue.set(state, 'timeline', timeline)
  },
  [types.INIT_TRENDS] (state, { trends }) {
    Vue.set(state, 'trends', trends)
  },
  [types.INIT_MODEL_TRENDS] (state, { trends }) {
    Vue.set(state, 'trends', trends)
  },
  [types.INIT_MODEL_TOPICS] (state, { topics }) {
    Vue.set(state, 'timeline', topics)
  },
  [types.UPDATE_TIMETIME] (state, { mid, type }) {
    let item = find(state.timeline, p => p.id === mid)
    let update = {}
    switch(type) {
    case 'like':
      update.likes_count = item.likes_count + 1
      update.liked = true
      break
    case 'unlike':
      update.likes_count = item.likes_count - 1
      update.liked = false
      break
    }
    // Yes, Object.assign can update state and UI component at same time.
    item = Object.assign(item, update)
  }
}