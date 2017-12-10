<template>
    <div v-if="isLoggedIn" class="profile-page">
        <f7-list media-list class="user-profile">
            <f7-list-item :media="avatarMedia" :title="user.fullname"
                          :text="getLocation(user.location).city + ' / ' + getLocation(user.location).country"></f7-list-item>
        </f7-list>
        <f7-grid class="custom-toolbar flex-row">
            <f7-col width="50" class="tool tool-border flex-rest-width">
                <p class="title">Car</p>
                <p v-if="user.car" class="text">{{user.car.model.brand.name}}</p>
                <p v-else class="text"> --- </p>
            </f7-col>
            <f7-col width="50" class="tool flex-rest-width">
                <p class="title" v-text="$t('post.post')"></p>
                <p v-if="user.topics" class="text" v-text="user.topics.length"></p>
                <p v-else class="text"> 0 </p>
            </f7-col>
        </f7-grid>

        <!-- Users Content-->
        <f7-card-header>{{$t('user.interests').toUpperCase()}}</f7-card-header>
        <f7-card-content>
            <f7-grid no-gutter>
                <f7-col v-for="interest in user.interests" :key="interest.id" width="25">
                    <div @click="routeToPosts(interest.brand)" class="avatar">
                        <img :src="interest.brand.cover_url"/>
                    </div>
                </f7-col>
            </f7-grid>
        </f7-card-content>
    </div>
    <div v-else class="empty-content">
        <i class="iconfont icon-about"/>
        <div class="text">
            <span>{{$t('app.login_needed')}}</span>
            <div class="page-content">
                <div class="content-block">
                    <p><a href="#" class="open-login-screen">Login</a></p>
                </div>
            </div>
            <login v-show="false"></login>
        </div>
    </div>
</template>

<script>
  import { Carousel, Slide } from 'vue-carousel'
  import Login from '../pages/auth/login.vue'

  export default {
    data () {
      return {
        isLoggedIn: this.$store.getters.isLoggedIn,
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      brands () {
        return this.$store.state.brands
      },
      avatarMedia () {
        return `<img class='avatar' src='${this.user.cover_url}' />`
      }
    },
    methods: {
      refresh () {
        this.$store.dispatch('getAuthUser')
      },
      checkLogin (val) {
        this.isLoggedIn = val
      },
      routeToPosts (brand) {
        this.$f7.mainView.router.load({url: `/posts/?bid=${brand.id}&brand=${brand.name}`})
      },
      getLocation (str) {
        let location = JSON.parse(str)
        return location
      }
    },
    created () {
      this.refresh()
      this.$bus.$on('isLoggedIn', this.checkLogin)
      this.$bus.$on('refresh-user', this.refresh)
    },
    components: {
      Carousel,
      Slide,
      Login
    }
  }
</script>

<style lang="less">
    @import "../assets/styles/mixins.less";

    .profile-page {
        background-color: white;
        font-size: 14px;
        .user-profile {

            .item-content {
                padding: 5px 10px;
            }
            .avatar {
                width: 65px;
                height: 65px;
                border-radius: 50%;
            }
            .item-title {
                font-size: 16px;
                font-weight: bold;
                padding-top: 20px;
            }
        }
        .card-header {
            background-color: @mainColor;
            font-size: 14px;
            color: #eeeeee;
            &:after {
                height: 0;
            }
        }
        .card-content {
            padding: 5px 10px;
            color: gray;
            .avatar > img {
                width: 40px;
                height: 40px;
                padding: 10px;
                border-radius: 50%;
                border: solid #eeeeee;
            }
            .avatar .test > img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                border: solid #eeeeee;
            }
            .text > p {
                text-transform: uppercase;
                font-size: 12px;
            }
            .review {

            }
            .review > img {
                background-color: rgba(0, 0, 0, 0.7);
                width: 100px;
                height: 100px;
                padding: 5px;
                border: solid #eeeeee;
            }
            .review > p {
                text-align: center;
                text-transform: uppercase;
                font-size: 12px;
            }

        }
        .custom-toolbar {
            background-color: black;
            text-align: center;
            color: #000;
            padding: 10px;
            &:before {
                background: #e1e1e1;
            }
            .tool {
                justify-content: center;
                &.tool-border {
                    border-right: 1px solid gray;
                }
                .title {
                    text-align: center;
                    margin: 0;
                    font-weight: 500;
                    text-transform: uppercase;
                    color: darkgrey;
                }
                .text {
                    text-align: center;
                    margin: 0;
                    font-weight: 900;
                    text-transform: uppercase;
                    color: whitesmoke;
                }
            }

        }
    }
</style>
