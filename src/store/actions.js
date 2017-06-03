/* eslint-disable indent */
import axios from 'axios'
import topicServices from '../api/topic'
import brandServices from '../api/brand'
import commentServices from '../api/comments'
import userServices from '../api/user'
import notificationServices from '../api/notifications'
import * as types from './mutation-types'

export function getLoginUser ({commit}) {
  axios.get('/user_login.json').then(res => {
    let user = res.data.user
    commit(types.INIT_USER_INFO, {
      user
    })
  })
}

export function getUsers ({commit}) {
  userServices.users()
    .then((response) => {
      let users = response.body.users
      console.log('users', users)
      commit(types.INIT_USERS, {
        users
      })
    })
}

export function getBrands ({commit}) {
  brandServices.brands()
    .then((response) => {
      let brands = response.body.brands
      console.log('brands', brands)
      commit(types.INIT_BRANDS, {
        brands
      })
    })
}

export function getComments ({commit}) {
  commentServices.comments()
    .then((response) => {
      let comments = response.body.comments
      console.log('brands', comments)
      commit(types.INIT_COMMENTS, {
        comments
      })
    })
}

export function getNotifications ({commit}) {
  notificationServices.notifications()
    .then((response) => {
      let notifications = response.body.notifications
      console.log('notifications', notifications)
      commit(types.INIT_NOTIFICATIONS, {
        notifications
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