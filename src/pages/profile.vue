<template>
    <div v-if="isLoggedIn" class="profile-page">
        <f7-list class="user-profile">
            <f7-list-item :media="avatarMedia">
                <div class="detail">
                    <div class="name">{{userData.fullname}}</div>
                    <div class="fullname">
                        <span>{{userData.email}}</span>
                    </div>
                </div>
            </f7-list-item>
        </f7-list>
        <f7-grid class="custom-toolbar flex-row">
            <f7-col width="50" class="tool tool-border flex-rest-width">
                <p class="title">Car</p>
                <p v-if="user.car" class="text">{{userData.car.model.brand.name}}</p>
                <p v-else class="text"> --- </p>
            </f7-col>
            <f7-col width="50" class="tool flex-rest-width">
                <p class="title" v-text="$t('post.post')"></p>
                <p v-if="userData.topics" class="text" v-text="userData.topics.length"></p>
                <p v-else class="text"> 0 </p>
            </f7-col>
        </f7-grid>

        <!-- Users Content-->
        <f7-card-header>INTERESTED IN</f7-card-header>
        <f7-card-content>
            <carousel
                    :scrollPerPage="true"
                    :perPageCustom="[[480, 2], [768, 3]]"
                    :perPage="4"
                    :paginationEnabled="false"
                    :autoplay="true"
                    :autoplayTimeout="3000">
                <slide v-for="interest in userData.interests">
                    <div @click="routeToPosts(interest.brand)" class="avatar">
                        <img :src="interest.brand.cover_url"/>
                    </div>
                </slide>
            </carousel>
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
  import userServices from '../api/user'

  export default {
    data () {
      return {
        isLoggedIn: this.$store.getters.isLoggedIn,
        userData: {}
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
        userServices.user(this.user.id).then((response) => {
          this.userData = response.body.user
        })
      },
      checkLogin (val) {
        this.isLoggedIn = val
      },
      routeToPosts (brand) {
        this.$f7.mainView.router.load({url: `/posts/?bid=${brand.id}&brand=${brand.name}`})
      }
    },
    created () {
      this.$bus.$on('isLoggedIn', this.checkLogin)
      this.refresh()
      this.$bus.$on('refreshUserData', this.refresh)
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

    @font-face {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        src: local('Open Sans'), local('OpenSans'), url('http://themes.googleusercontent.com/static/fonts/opensans/v5/cJZKeOuBrn4kERxqtaUH3T8E0i7KZn-EPnyo3HZu7kw.woff') format('woff');
    }

    .profile-page {
        background-color: white;
        font-family: 'open sans', arial, sans-serif;
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
            .detail {
                .fullname {
                    color: #858585;
                    font-size: 15px;
                    margin-top: 5px;
                }
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
