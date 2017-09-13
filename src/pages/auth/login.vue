<template>
    <f7-popup id="loginPopup" class="login-screen" popup-mypopup>
        <f7-view>
            <f7-pages>
                <f7-page navbar-fixed>
                    <f7-navbar theme="white">
                        <f7-nav-center :title="$t('app.login')"></f7-nav-center>
                        <f7-nav-right>

                            <f7-link close-popup>
                                <f7-icon style="color: gray" f7="close" size="22px"></f7-icon>
                            </f7-link>
                        </f7-nav-right>
                    </f7-navbar>
                    <f7-page>
                        <div class="page-content login-screen-content">
                            <form>
                                <div class="list-block">
                                    <ul>
                                        <li class="item-content">
                                            <div class="item-inner">
                                                <div class="item-title label">Username</div>
                                                <div class="item-input">
                                                    <input type="text" v-model="username" placeholder="Your username">
                                                </div>
                                            </div>
                                        </li>
                                        <li class="item-content">
                                            <div class="item-inner">
                                                <div class="item-title label">Password</div>
                                                <div class="item-input">
                                                    <input type="password" v-model="password"
                                                           placeholder="Your password">
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="list-block">
                                    <ul>
                                        <li @click="login" class="item-link list-button">Sign In</li>
                                    </ul>
                                    <div class="list-block-label">
                                        <p>Create new account. <a href="#" data-popup=".popup-register" class="open-popup">Register</a></p>
                                    </div>
                                    <register-view></register-view>
                                </div>
                            </form>
                        </div>
                    </f7-page>
                </f7-page>
            </f7-pages>
        </f7-view>
    </f7-popup>
</template>
<script>
  import RegisterView from '../auth/register.vue'

  export default {
    data () {
      return {
        username: this.username,
        password: this.password
      }
    },
    computed: {
      isLoggedIn () {
        return this.$store.getters.isLoggedIn
      }
    },
    components: {
      RegisterView
    },
    methods: {
      login () {
        const data = {
          username: this.username,
          password: this.password,
          client_id: '2',
          client_secret: 'Bk6xkvVJ1uPjooooC6z0MOj6y2JRdREknJJzsm9u',
          grant_type: 'password'
        }
        this.$store.dispatch('login', data).then(() => {
          this.$store.dispatch('getAuthUser').then(() => {
            this.$bus.$emit('refreshPosts')
            this.$bus.$emit('isLoggedIn', true)
            this.$f7.closeModal('#loginPopup')
            this.$f7.showTab('#profile')
          })
        })
      },
      openRegister () {
        this.$f7.closeModal('#loginPopup')
        this.$f7.mainView.router.load({url: 'register'})
      }
    }
  }

</script>
<style lang="less">
    .login-view {
        .login-screen-title {
            padding: 50px;
        }
    }
</style>