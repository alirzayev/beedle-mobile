<template>
    <div class="settings-view">
        <div v-if="isLoggedIn">
            <f7-list class="user-profile">
                <f7-list-item link="/profile/" :media="avatarMedia">
                    <div slot="inner-start" class="detail">
                        <div class="name">{{userInfo.fullname}}</div>
                        <div class="location">
                            <span>{{$t('app.email')}}: </span>
                            <span>{{userInfo.email}}</span>
                        </div>
                    </div>
                </f7-list-item>
            </f7-list>
            <f7-list>
                <f7-list-item :title="$t('app.language')" link="/language/"
                              media="<i class='iconfont icon-language'></i>"></f7-list-item>
            </f7-list>
            <f7-list>
                <f7-list-item :title="$t('app.chat')" link="/feedback/"
                              media="<i class='iconfont icon-feedback2'></i>"></f7-list-item>
            </f7-list>
            <f7-list>
                <f7-list-item :title="$t('app.about')" link="/about/"
                              media="<i class='iconfont icon-about1'></i>"></f7-list-item>
            </f7-list>
            <f7-list>
                <f7-list-item :title="$t('app.logout')"
                              @click="logout"
                              media="<i class='iconfont icon-logout'></i>"></f7-list-item>
            </f7-list>

        </div>
        <div v-else class="empty-content">
            <i class="iconfont icon-about"/>
            <div class="text">
                <span>{{$t('app.login_needed')}}</span>
                <p>
                    <f7-link href="/login/">{{$t('app.login')}}</f7-link>
                </p>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    .settings-view {
        .list-block {
            margin: 20px 0;
            .iconfont {
                height: 29px;
            }
            .icon-language {
                color: #0099FF;
            }
            .icon-feedback2 {
                color: #00CC99;
            }
            .icon-about1 {
                color: #FFCC33;
            }
        }
        .user-profile {
            .item-content {
                padding-top: 5px;
                padding-bottom: 5px;
            }
            .avatar {
                width: 65px;
                height: 65px;
                border-radius: 5px;
            }
            .detail {
                .location {
                    color: #858585;
                    font-size: 15px;
                    margin-top: 5px;
                }
            }
        }
    }
</style>

<script>
  import LoginView from '../pages/auth/login.vue'

  export default {
    computed: {
      isLoggedIn() {
        return this.$store.getters.isLoggedIn
      },
      userInfo() {
        return this.$store.getters.user
      },
      avatarMedia() {
        return `<img class='avatar' src='${this.userInfo.cover_url}' />`
      }
    },
    methods: {
      logout(){
        this.$store.dispatch('destroyToken')
        this.$bus.$emit('refreshPosts')
      }
    },
    mounted(){
      this.$bus.$emit('refreshPosts')
      this.$store.dispatch('getAuthUser')
    },
    components: {
      LoginView
    }
  }
</script>