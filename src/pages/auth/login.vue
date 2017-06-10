<template>
    <div class="login-view">
        <div data-page="login-screen" class="page no-swipeback">
            <f7-navbar>
                <f7-nav-left>
                    <a href="#" class="back link">
                        <f7-icon f7="left"></f7-icon>
                        <span>{{$t('app.back')}}</span>
                    </a>
                </f7-nav-left>
                <f7-nav-center :title="$t('app.login')"></f7-nav-center>
            </f7-navbar>
            <div class="page-content login-screen-content">
                <div class="login-screen-title">{{$t('app.login')}}</div>
                <form>
                    <div class="list-block">
                        <ul>
                            <li class="item-content">
                                <div class="item-inner">
                                    <div class="item-title label">Username</div>
                                    <div class="item-input">
                                        <input type="text" v-model="username" placeholder="Your username"/>
                                    </div>
                                </div>
                            </li>
                            <li class="item-content">
                                <div class="item-inner">
                                    <div class="item-title label">Password</div>
                                    <div class="item-input">
                                        <input type="password" v-model="password" placeholder="Your password"/>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="list-block">
                        <ul>
                            <li><a @click="login" class="item-link list-button">Sign In</a></li>
                        </ul>
                        <div class="list-block-label">
                            <p>Click Sign In to close Login Screen</p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    data(){
      return {
        username: this.username,
        password: this.password
      }
    },
    methods: {
      login() {
        const data = {
          username: this.username,
          password: this.password,
          client_id: '2',
          client_secret: 'Bk6xkvVJ1uPjooooC6z0MOj6y2JRdREknJJzsm9u',
          grant_type: 'password'
        }
        this.$store.dispatch('login', data)
        this.$f7.mainView.router.back()
      }
    }
  }

</script>
<style lang="less">
    .login-view {
        .login-screen-title{
            padding: 50px;
        }
    }
</style>