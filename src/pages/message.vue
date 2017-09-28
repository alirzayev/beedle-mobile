<template>
    <f7-page class="message-page">
        <f7-navbar>
            <f7-nav-left>
                <a href="#" class="back link">
                    <f7-icon f7="left"></f7-icon>
                    <span>{{$t('app.back')}}</span>
                </a>
            </f7-nav-left>
            <f7-nav-center :title="nickname"></f7-nav-center>
        </f7-navbar>
        <f7-messages>
            <f7-message v-for="message in messages"
                        :key="message.id"
                        :text="message.message"
                        :label="formatDate(message.created_at)"
                        :name="getName(message.user.fullname)"
                        :avatar="message.user.cover_url"
                        :type="getType(message.user.id)"
                        @click="onClick"
                        @click:text="onTextClick"
                        @click:name="onNameClick"
                        @click:avatar="onAvatarClick"
            ></f7-message>
        </f7-messages>
        <f7-messagebar :placeholder="$t('message.placeholder')" :send-link="$t('app.send')"
                       @submit="onSubmit"></f7-messagebar>
    </f7-page>
</template>

<style lang="less">
    .message-page {
    }
</style>

<script>
  import moment from 'moment'
  import messageServices from '../api/message'
  import Echo from 'laravel-echo'

  window.Pusher = require('pusher-js')

  export default {
    computed: {
      messages () {
        return this.$store.state.messages
      },
      nickname () {
        let query = this.$route.query
        return query.nickname || this.$t('app.chat')
      }
    },
    methods: {
      onClick (event) {
        console.log('message click')
      },
      onAvatarClick () {
        console.log('avatar-click')
      },
      onTextClick () {
        console.log('text-click')
      },
      onNameClick () {
        console.log('name-click')
      },
      onSubmit: function (text, clear) {
        if (text.trim().length === 0) return
        var data = {
          message: text,
          receiver_id: this.$route.query.uid
        }
        messageServices.sendMessage(data)
        // Clear Message Bar
        clear()
      },
      getType (id) {
        if (id !== this.$store.getters.user.id) {
          return 'received'
        } else {
          return 'sent'
        }
      },
      formatDate (date) {
        return moment.parseZone(date).fromNow()
      },
      getName (name) {
        if (name === this.nickname) {
          return name
        } else {
          return this.$t('message.me')
        }
      }
    },
    mounted () {
      let query = this.$route.query
      this.$store.dispatch('getMessages', query.uid)

      window.Echo = new Echo({
        broadcaster: 'pusher',
        key: '424e4a5f4c4828333a4b',
        authEndpoint: 'http://localhost:8000/broadcasting/auth',
        auth: {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        },
        cluster: 'eu',
        encrypted: true
      })
      window.Echo.join('mychat')
        .here((users) => {
          console.log('chat users', users)
        })
        .joining((user) => {
          console.log(user.name)
        })
        .leaving((user) => {
          console.log(user.name)
        })
        .listen('MessageSent', (e) => {
          console.log('event object', e)
          this.messages.push({
            message: e.message.message,
            user: e.user
          })
        })
    }
  }
</script>