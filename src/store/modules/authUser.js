/* eslint-disable eol-last,comma-dangle,no-trailing-spaces,no-trailing-spaces,space-before-function-paren,space-before-blocks,padded-blocks,brace-style */
import authService from '../../api/auth'

const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS'
const AUTHENTICATE_FAILURE = 'AUTHENTICATE_FAILURE'
const AUTH_USER = 'AUTH_USER'

// initial State
const state = {
  isLoggedIn: !!localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user'))
}

// getters
const getters = {
  isLoggedIn: state => {
    return state.isLoggedIn
  },
  user: state => {
    return state.user
  }
}

// actions
const actions = {
  login ({commit}, data) {
    return authService.authenticate(data)
      .then(response => {
        localStorage.setItem('token', response.body.access_token)
        console.log('login success', response)
        commit(AUTHENTICATE_SUCCESS)
      })
  },
  getAuthUser({commit}){
    return authService.user()
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.body))
        console.log('auth user', response)
        commit(AUTH_USER, {user: response.body})
      })
  },
  destroyToken({commit}){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    commit(AUTHENTICATE_FAILURE)
    console.log('User is Logout!')
  }
}

// mutations
const mutations = {

  [AUTHENTICATE_SUCCESS] (state) {
    state.isLoggedIn = true
  },

  [AUTHENTICATE_FAILURE] (state) {
    state.isLoggedIn = false
  },

  [AUTH_USER] (state, {user}) {
    state.user = user
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
