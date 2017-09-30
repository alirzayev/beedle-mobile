<template>
    <f7-login-screen class="login-view">
        <f7-navbar theme="white" navbar-fixed>
            <f7-nav-center :title="$t('app.login')"></f7-nav-center>
            <f7-nav-right>
                <f7-link close-login-screen>
                    <f7-icon style="color: gray" f7="close" size="22px"></f7-icon>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>
        <f7-views>
            <f7-block>
                <f7-login-screen-title>{{ $t('app.app_name') }}</f7-login-screen-title>
                <f7-list inset form>
                    <f7-list-item>
                        <f7-label>Username</f7-label>
                        <input type="text" v-model="username" placeholder="Your username">
                    </f7-list-item>
                    <f7-list-item>
                        <f7-label>Password</f7-label>
                        <input type="password" v-model="password" placeholder="Your password">
                    </f7-list-item>
                </f7-list>
                <f7-list inset>
                    <f7-list-button @click="login" title="Sign In" close-login-screen></f7-list-button>
                    <f7-list-label>
                        <p>Create new account.
                            <f7-link href="/register/" close-login-screen>Register</f7-link>
                        </p>
                    </f7-list-label>
                </f7-list>
            </f7-block>
        </f7-views>
    </f7-login-screen>
</template>
<script>
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
    components: {},
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
        .list-block-label {
            text-align: center;
        }
    }
</style>