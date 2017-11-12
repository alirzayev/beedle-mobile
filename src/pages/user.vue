<template>
    <f7-page class="profile-page">
        <f7-navbar>
            <f7-nav-left>
                <a href="#" class="back link">
                    <f7-icon f7="left"></f7-icon>
                    <span>{{$t('app.back')}}</span>
                </a>
            </f7-nav-left>
            <f7-nav-center :title="$t('app.profile')"></f7-nav-center>
        </f7-navbar>

        <f7-list media-list class="user-profile">
            <f7-list-item :media="avatarMedia" :title="user.fullname">
                <div class="item-title-row">
                    <div v-if="user.location" class="subtitle">
                        {{getLocation(user.location).city}} / {{getLocation(user.location).country}}
                    </div>
                    <div v-else class="subtitle">Worldwide</div>
                    <div style="float: right; margin-bottom: 10px">
                        <div @click="openChat">
                            <f7-button color="black">{{$t('app.chat')}}</f7-button>
                        </div>
                    </div>
                </div>
            </f7-list-item>

        </f7-list>
        <f7-grid class="custom-toolbar flex-row">
            <f7-col width="50" class="tool tool-border flex-rest-width">
                <p class="title">Car</p>
                <p v-if="user.car" class="text">{{user.car.name}}</p>
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
            <carousel
                    :scrollPerPage="true"
                    :perPageCustom="[[480, 2], [768, 3]]"
                    :perPage="4"
                    :paginationEnabled="false"
                    :autoplay="true"
                    :autoplayTimeout="3000">
                <slide v-for="interest in user.interests" :key="interest.id">
                    <div @click="routeToPosts(interest.brand)" class="avatar">
                        <img :src="interest.brand.cover_url"/>
                    </div>
                </slide>
            </carousel>
        </f7-card-content>

    </f7-page>
</template>

<script>
  import { Carousel, Slide } from 'vue-carousel'
  import userServices from '../api/user'

  export default {
    data () {
      return {
        user: {},
      }
    },
    computed: {
      brands () {
        return this.$store.state.brands
      },
      avatarMedia () {
        return `<img class='avatar' src='${this.user.cover_url}' />`
      }
    },
    created () {
      let id = parseInt(this.$route.query.uid)
      console.log('related user', this.user)
      userServices.user(id).then((response) => {
        this.user = response.body.user
      })
    },
    components: {
      Carousel,
      Slide
    },
    methods: {
      openChat () {
        this.$f7.mainView.router.load({url: `/message/?uid=${this.user.id}&nickname=${this.user.fullname}`})
      },
      routeToPosts (brand) {
        this.$f7.mainView.router.load({url: `/posts/?bid=${brand.id}&brand=${brand.name}`})
      },
      getLocation (str) {
        if (str !== 'undefined') {
          var location = JSON.parse(str)
          return location
        }
      }
    }
  }
</script>

<style lang="less">
    @import "../assets/styles/mixins.less";

    .profile-page {
        background-color: white;
        font-family: 'open sans', arial, sans-serif;
        .user-profile {
            font-size: 16px;
            .avatar {
                width: 65px;
                height: 65px;
                border-radius: 50%;
            }
            .subtitle {
                color: #858585;
                font-size: 14px;
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
                margin-top: 0px;
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
                margin-top: 0px;
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