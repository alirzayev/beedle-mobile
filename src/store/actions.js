/* eslint-disable indent */
import axios from 'axios'
import topicServices from '../api/topic'

import * as types from './mutation-types'

export function getLoginUser ({commit}) {
  axios.get('/user_login.json').then(res => {
    let user = res.data.user
    commit(types.INIT_USER_INFO, {
      user
    })
  })
}

export function setLang ({commit}, lang) {
  commit(types.UPDATE_LANG, lang)
}

export function getContacts ({commit}) {
  axios.get('/contacts.json').then(res => {
    let contacts = res.data
    commit(types.INIT_CONTACTS, {
      contacts
    })
  })
}

export function getTimeline ({commit}, callback = () => {}) {
  topicServices.topics()
    .then((response) => {
      let timeline = response.body.topics
      console.log('topics', timeline)
      commit(types.INIT_TIMETIME, {
        timeline
      })
      callback()
    })
}

export function updateTimeline ({commit}, {mid, type}) {
  switch (type) {
    case 'like':
      topicServices.like(mid)
        .then((response) => {
          console.log('likes', response)
          commit(types.UPDATE_TIMETIME, {
            mid,
            type
          })
        })
      break
    case 'unlike':
      topicServices.dislike(mid)
        .then((response) => {
          console.log('dislikes', response)
          commit(types.UPDATE_TIMETIME, {
            mid,
            type
          })
        })
      break
  }
}