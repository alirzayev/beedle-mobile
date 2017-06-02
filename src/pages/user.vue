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

        <f7-list  class="user-profile">
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
                <p class="text">Fiat 500</p>
            </f7-col>
            <f7-col width="50" class="tool flex-rest-width">
                <p class="title">Total</p>
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
                    :paginationEnabled="true"
            >
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

    </f7-page>
</template>

<script>
  import { Carousel, Slide } from 'vue-carousel'
  import find from 'lodash/find'

  export default {
    data() {
      return {
        user: {},
      }
    },
    computed: {
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
    created() {
      let query = this.$route.query
      this.user = find(this.users, user => user.id === parseInt(query.uid))
      console.log('related user', this.user)
    },
    components: {
      Carousel,
      Slide
    },
    methods: {
      formatGender(gender) {
        if (gender === 'm') return this.$t('app.male')
        else if (gender === 'f') return this.$t('app.female')
        else return this.$t('app.unknown')
      }
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
        padding-top: 30px;
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