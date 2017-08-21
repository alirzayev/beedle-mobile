<template>
    <div v-if="isLoggedIn" class="profile-page">
        <f7-list class="user-profile">
            <f7-list-item :media="avatarMedia">
                <div class="detail">
                    <div class="name">{{user.fullname}}</div>
                    <div class="fullname">
                        <span>{{user.email}}</span>
                    </div>
                </div>
            </f7-list-item>
        </f7-list>
        <f7-grid class="custom-toolbar flex-row">
            <f7-col width="50" class="tool tool-border flex-rest-width">
                <p class="title">Car</p>
                <p v-if="user.car" class="text">{{user.car.model.brand.name}} {{user.car.model.name}}</p>
            </f7-col>
            <f7-col width="50" class="tool flex-rest-width">
                <p class="title" v-text="$t('post.post')"></p>
                <p class="text" v-text="500"></p>
            </f7-col>
        </f7-grid>

        <!-- Users Content-->
        <f7-card-header>INTERESTED IN</f7-card-header>
        <f7-card-content>
            <carousel
                    :scrollPerPage="true"
                    :perPageCustom="[[480, 2], [768, 3]]"
                    :perPage="4"
                    :paginationEnabled="true">
                <slide v-for="brand in brands">
                    <div class="avatar">
                        <img :src="brand.cover_url"/>
                    </div>
                    <div class="text">
                        <p class="text" v-text="brand.name"></p>
                    </div>
                </slide>
                <slide v-for="brand in brands">
                    <div class="avatar">
                        <img :src="brand.cover_url"/>
                    </div>
                    <div class="text">
                        <p class="text" v-text="brand.name"></p>
                    </div>
                </slide>
                <slide v-for="brand in brands">
                    <div class="avatar">
                        <img :src="brand.cover_url"/>
                    </div>
                    <div class="text">
                        <p class="text" v-text="brand.name"></p>
                    </div>
                </slide>
                <slide v-for="brand in brands">
                    <div class="avatar">
                        <img :src="brand.cover_url"/>
                    </div>
                    <div class="text">
                        <p class="text" v-text="brand.name"></p>
                    </div>
                </slide>
                <slide v-for="brand in brands">
                    <div class="avatar">
                        <img :src="brand.cover_url"/>
                    </div>
                    <div class="text">
                        <p class="text" v-text="brand.name"></p>
                    </div>
                </slide>

            </carousel>
        </f7-card-content>

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
</template>

<script>
  import { Carousel, Slide } from 'vue-carousel'

  export default {
    computed: {
      isLoggedIn() {
        return this.$store.getters.isLoggedIn
      },
      user() {
        return this.$store.getters.user
      },
      users(){
        return this.$store.state.users
      },
      brands(){
        return this.$store.state.brands
      },
      avatarMedia() {
        return `<img class='avatar' src='${this.user.cover_url}' />`
      }
    },
    components: {
      Carousel,
      Slide
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
