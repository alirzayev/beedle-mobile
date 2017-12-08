/* eslint-disable indent,camelcase */
import topicServices from '../api/topic'
import brandServices from '../api/brand'
import modelServices from '../api/model'
import commentServices from '../api/comments'
import userServices from '../api/user'
import notificationServices from '../api/notifications'
import messageServices from '../api/message'
import locationServices from '../api/location'
import * as types from './mutation-types'

export function getUsers ({commit}, data) {
  userServices.users(data)
    .then((response) => {
      let users = response.body.users.data
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

export function getModels ({commit}, id) {
  modelServices.models(id)
    .then((response) => {
      let models = response.body.models
      console.log('brand models', response.body)
      commit(types.INIT_MODELS, {
        models
      })
    })
}

export function getComments ({commit}) {
  commentServices.comments()
    .then((response) => {
      let comments = response.body.comments
      console.log('comments', comments)
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

export function getTimeline ({commit}, model_id = null) {
  if (model_id) {
    return modelServices.topics(model_id)
      .then((response) => {
        let topics = response.body.topics
        console.log('model topics', topics)
        commit(types.INIT_MODEL_TOPICS, {
          topics
        })
      })
  } else {
    return topicServices.topics()
      .then((response) => {
        let timeline = response.body.topics
        console.log('topics', timeline)
        commit(types.INIT_TOPICS, {
          timeline
        })
      })
  }
}

export function getTrends ({commit}, model_id = null) {
  if (model_id) {
    return modelServices.trends(model_id)
      .then((response) => {
        let trends = response.body.topics
        console.log('trends', trends)
        commit(types.INIT_MODEL_TRENDS, {
          trends
        })
      })
  } else {
    return topicServices.trends()
      .then((response) => {
        let trends = response.body.topics
        console.log('trends', trends)
        commit(types.INIT_TRENDS, {
          trends
        })
      })
  }
}

export function getBrandTopics ({commit}, brand_id) {
  return brandServices.topics(brand_id)
    .then((response) => {
      let topics = response.body.topics
      console.log('brand topics', topics)
      commit(types.INIT_BRAND_TOPICS, {
        topics
      })
    })
}

export function getFilteredPosts ({commit}, brand_id) {
  return topicServices.topics()
    .then((response) => {
      let topics = response.body.topics
      console.log('filtered topics', topics)
      commit(types.INIT_FILTERED_TOPICS, {
        topics
      })
    })
}

export function getMessages ({commit}, user_id) {
  messageServices.messages(user_id)
    .then((response) => {
      let messages = response.body.messages
      console.log('chat messages', response.body)
      commit(types.INIT_MESSAGES, {
        messages
      })
    })
}

export function sendMessage (data) {
  messageServices.sendMessage(data)
    .then((response) => {
      let message = response.body.message
      console.log('message sent', message)
    })
}

export function getCountries ({commit}) {
  locationServices.countries()
    .then((response) => {
      let countries = response.body.countries
      console.log('countries', countries)
      commit(types.INIT_COUNTRIES, {
        countries
      })
    })
}

export function getCities ({commit}, data) {
  locationServices.cities(data)
    .then((response) => {
      let cities = response.body.cities
      console.log('cities', cities)
      commit(types.INIT_CITIES, {
        cities
      })
    })
}