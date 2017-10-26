<template>
    <f7-popup id="notificationPopup" popup-mypopup>
        <f7-view>
            <f7-pages>
                <f7-page navbar-fixed>
                    <f7-navbar theme="white">
                        <f7-nav-center :title="$t('notification.notification')"></f7-nav-center>
                        <f7-nav-right>

                            <f7-link close-popup>
                                <f7-icon style="color: gray" f7="close" size="22px"></f7-icon>

                            </f7-link>
                        </f7-nav-right>
                    </f7-navbar>
                    <div v-if="!user" class="empty-content">
                        <i class="iconfont icon-about"/>
                        <div class="text">
                            <span>{{$t('app.login_needed')}}</span>
                        </div>
                    </div>
                    <f7-page v-else>
                        <f7-list v-if="notifications.length" v-for="notification in notifications" :key="notification.id" class="notification">
                            <f7-list-item :media="avatarMedia(notification.owner.cover_url)"
                                          :link="'/post/?mid='+notification.topic.id">
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
                    </f7-page>
                </f7-page>
            </f7-pages>
        </f7-view>
    </f7-popup>
</template>

<script>
  import moment from 'moment'

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
      formatTime (time) {
        return moment(Date.parse(time)).fromNow()
      },
    },
    mounted () {
      if (this.isLoggedIn) {
        this.$store.dispatch('getNotifications')
        this.$nextTick(_ => {
          this.$f7.addView('.popup-mypopup .view')
        })
      }
    },
    methods: {
      avatarMedia (url) {
        return `<img class='avatar' src='${url}' />`
      },
    }
  }
</script>
<style lang="less">
    .notification {
        font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;

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