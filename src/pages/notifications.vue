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
                <f7-list-item :media="avatarMedia(notification.owner.cover_url)"
                              @click="updateNotification(notification.id)"
                              :link="`/post/?mid=${notification.topic.id}`">
                    <div class="detail">
                        <div class="fullname"><strong>{{notification.owner.fullname}}</strong>
                            commented on your post
                        </div>
                        <div class="subtext">
                            <span>{{notification.created_at}}</span>
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
      }
    },
    beforeDestroy () {
      this.$store.dispatch('getNotifications')
    },
    methods: {
      avatarMedia (url) {
        return `<img class='avatar' src='${url}' />`
      },
      updateNotification (id) {
        notificationServices.update(id)
          .then((response) => {
            console.log('notification is updated', response.body)
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