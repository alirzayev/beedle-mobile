<template>
    <f7-page class="settings-view">
            <f7-navbar>
                <f7-nav-left>
                    <a href="#" class="back link">
                        <f7-icon f7="left"></f7-icon>
                        <span>{{$t('app.back')}}</span>
                    </a>
                </f7-nav-left>
                <f7-nav-center :title="$t('app.settings')"></f7-nav-center>
            </f7-navbar>

            <div v-if="isLoggedIn">
                <f7-list>
                    <f7-list-item :title="$t('app.language')" link="/language/"
                                  media="<i class='iconfont icon-language'></i>"></f7-list-item>
                </f7-list>
                <f7-list>
                    <f7-list-item :title="$t('app.profile')" link="/update/"
                                  media="<i class='iconfont icon-ios7person'></i>"></f7-list-item>
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
    </f7-page>
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
        this.$bus.$emit('isLoggedIn', false)
        this.$f7.mainView.router.back()
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