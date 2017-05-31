<template>
    <div class="login-view">
        <div data-page="login-screen" class="page no-navbar no-toolbar no-swipeback">
            <div class="page-content login-screen-content">
                <div class="login-screen-title">My App</div>
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
      }
    }
  }

</script>
<style lang="less">
    .login-view {
        display: block;
    }
</style>