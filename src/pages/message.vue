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
            <f7-nav-right>
                <f7-link open-popover>
                    <f7-icon f7="flag"></f7-icon>
                </f7-link>
                <!-- Popover -->
                <f7-popover>
                    <!-- Popover content goes here -->
                    <f7-list>
                        <f7-list-button open-popup="#reportUserPopup" close-popover>Report User</f7-list-button>
                        <f7-list-button v-if="!block.isBlocked" @click="blockUser"
                                        close-popover>Block User
                        </f7-list-button>
                        <f7-list-button v-else-if="block.isBlocked && block.data.block_by === user.id"
                                        @click="unBlockUser(block.data.id)" close-popover>Unblock User
                        </f7-list-button>
                    </f7-list>
                </f7-popover>
            </f7-nav-right>
        </f7-navbar>
        <f7-messages>
            <f7-message v-if="!block.isBlocked" v-for="message in messages"
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
        <f7-messagebar v-if="!block.isBlocked" :placeholder="$t('message.placeholder')" :send-link="$t('app.send')"
                       @submit="onSubmit">
        </f7-messagebar>
        <f7-block v-if="block.isBlocked" class="block">
            <div v-if="block.data.block_by == user.id">
                <span><h2>You blocked this user</h2></span>
                <f7-button @click="unBlockUser(block.data.id)" class="button-big">Unblock</f7-button>
            </div>
            <f7-block v-else>
                <span>
                    <h1>Upps!</h1>
                    <h2>This user is blocked </h2>
                </span>
            </f7-block>
        </f7-block>
        <!-- Report Topic Popup -->
        <f7-popup tablet-fullscreen id="reportUserPopup">
            <!-- Popup content goes here -->
            <div class="content-block-title">Why are you flagging this?</div>
            <f7-list form class="list-block media-list">
                <f7-list-item radio name="report-user-radio" value="Violence" checked>
                    <div class="item-title-row">
                        <div class="item-title">Violence</div>
                    </div>
                    <div class="item-text">This user is hatefull, abusive or does not folow our guidelines</div>
                </f7-list-item>
                <f7-list-item radio name="report-user-radio" value="Spammer">
                    <div class="item-title-row">
                        <div class="item-title">Spammer</div>
                    </div>
                    <div class="item-text">
                        This user is spammer, it is not useful or relevant, but promotional in nature.
                    </div>
                </f7-list-item>
                <f7-list-item radio name="report-user-radio" value="Other">
                    <div class="item-title-row">
                        <div class="item-title">Other</div>
                    </div>
                </f7-list-item>
                <f7-list-item>
                    <div class="row">
                        <div class="col-50">
                            <f7-button close-popup class="button-big" color="blue">Cancel</f7-button>
                        </div>
                        <div class="col-50">
                            <f7-button @click="reportUser" class="button-big" color="green" bg="white">Report
                            </f7-button>
                        </div>
                    </div>
                </f7-list-item>

            </f7-list>
        </f7-popup>
    </f7-page>
</template>

<style lang="less">
    .message-page {
        .block {
            div {
                height: 200px;
                line-height: 200px;
                text-align: center;
            }
            span {
                display: inline-block;
                vertical-align: middle;
                line-height: normal;
            }
        }
    }
</style>

<script>
  import moment from 'moment'
  import messageServices from '../api/message'
  import Echo from 'laravel-echo'
  import userServices from '../api/user'

  window.Pusher = require('pusher-js')

  export default {
    data () {
      return {
        block: []
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      messages () {
        return this.$store.state.messages
      },
      nickname () {
        let query = this.$route.query
        return query.nickname || this.$t('app.chat')
      }
    },
    methods: {
      refresh () {
        let query = this.$route.query
        this.$store.dispatch('getMessages', query.uid).then((response) => {
          console.log('blocked message', response)
        })
        messageServices.checkBlock(query.uid).then((response) => {
          this.block = response.body.block
        })
      },
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
        this.messages.push({
          message: text,
          user: this.$store.getters.user
        })
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
      },
      blockUser () {
        let query = this.$route.query
        messageServices.block({blocked_user_id: query.uid}).then((response) => {
          this.$f7.alert(response.body.message, query.nickname)
          this.refresh()
        })
      },
      unBlockUser (id) {
        let query = this.$route.query
        messageServices.unBlock(id).then((response) => {
          this.$f7.alert(query.nickname + 'is unblocked', 'Message')
          this.refresh()
        })
      },
      reportUser () {
        let query = this.$route.query
        this.$f7.showIndicator()
        let report = this.$$('input[name="report-user-radio"]:checked').val()
        userServices.report({user_id: query.uid, reason: report}).then(() => {
          this.$f7.hideIndicator()
          this.$f7.alert('User is reported successfully!', 'Report')
        })
      }
    },
    mounted () {
      this.refresh()
      window.Echo = new Echo({
        broadcaster: 'pusher',
        key: '424e4a5f4c4828333a4b',
        authEndpoint: this.$http.options.root + '/broadcasting/auth',
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