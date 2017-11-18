<template>
    <div v-if="!isLoggedIn" class="empty-content">
        <i class="iconfont icon-about"/>
        <div class="text">
            <span>{{$t('app.login_needed')}}</span>
        </div>
    </div>
    <div v-else>
        <f7-list v-if="notifications.length" v-for="notification in notifications"
                 :key="notification.id" class="notification">
            <f7-list-item :media="avatarMedia(notification.data.owner.cover_url)"
                          @click="updateNotification(notification.id)"
                          :link="`/post/?mid=${notification.data.topic.id}`">
                <div class="detail">
                    <div class="fullname"><strong>{{notification.data.owner.fullname}}</strong>
                        commented on your post
                    </div>
                    <div class="subtext">
                        <span>{{notification.data.created_at}}</span>
                    </div>
                </div>
            </f7-list-item>
        </f7-list>
        <div class="empty-content" v-show="notifications.length===0">
            <i class="iconfont icon-wujieguoyangshi"/>
            <div class="text">
                <span>{{$t('app.empty_container')}}</span>
            </div>
        </div>
    </div>
</template>

<script>
  import moment from 'moment'
  import notificationServices from '../api/notifications'
  import Echo from 'laravel-echo'

  export default {
    data () {
      return {}
    },
    computed: {
      isLoggedIn () {
        return this.$store.getters.isLoggedIn
      },
      user () {
        return this.$store.getters.user
      },
      notifications () {
        return this.$store.state.notifications
      },
      formatTime (date) {
        return moment.parseZone(date).fromNow()
      },
    },
    created () {
      if (this.isLoggedIn) {
        this.$store.dispatch('getNotifications')
        window.Echo = new Echo({
          broadcaster: 'socket.io',
          host: this.$http.options.root + ':6001',
          auth: {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
          },
        })
        window.Echo.private('App.Models.User.' + this.user.id)
          .notification((event) => {
            console.log('notification event', event)
            let notification = {'data': event}
            this.notifications.push(notification)
            this.$f7.addNotification({
              title: 'Beedle',
              subtitle: event.owner.fullname + ' commented on your post',
              media: this.avatarMedia(event.owner.cover_url)
            })
          })
      }
    },
    methods: {
      avatarMedia (url) {
        return `<img class='avatar' src='${url}' />`
      },
      updateNotification (id) {
        notificationServices.update(id)
          .then((response) => {
            console.log('notification is updated', response.body)
            this.$store.dispatch('getNotifications')
          })
      }
    }
  }
</script>
<style lang="less">
    .notification {
        .item-content {
            padding: 5px 10px;
        }
        .avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
        .detail {
            .fullname {
                font-size: 14px;
                margin-top: 5px;
            }
            .subtext {
                color: #858585;
                font-size: 12px;
                margin-top: 5px;
            }
        }
    }


</style>