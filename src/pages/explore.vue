<template>
    <f7-card>
        <!-- Brands Content-->
        <div class="explore-view">
            <f7-card-header>{{$t('app.brands').toUpperCase()}}</f7-card-header>
            <f7-card-content>
                <f7-grid no-gutter>
                    <f7-col v-for="brand in brands" :key="brand.id" width="33">
                        <div @click="routeToModels(brand)">
                            <div class="cover">
                                <img :src="brand.cover_url"/>
                            </div>
                        </div>
                    </f7-col>
                </f7-grid>
            </f7-card-content>
            <f7-block class="more_btn">
                <f7-button href="/brands/" color="gray" round>All</f7-button>
            </f7-block>
            <f7-block style="margin-top: 35px">
                <hr size="1px" color="#c4c4c4"/>
            </f7-block>
            <!-- Review Content-->
            <f7-card-header>{{$t('explorer.reviews').toUpperCase()}}</f7-card-header>
            <f7-card-content>
                <carousel
                        :scrollPerPage="false"
                        :perPageCustom="[[768, 3], [1024, 4]]"
                        :autoplay="true"
                        :perPage="3"
                        :paginationEnabled="false"
                        :autoplayTimeout="2000">
                    <slide class="review" v-for="comment in comments" :key="comment.id">
                        <img @click="routeToPost(comment.topic.id)" :src="comment.topic.model.cover_url"/>
                    </slide>
                </carousel>
            </f7-card-content>
            <f7-block>
                <hr size="1px" color="#c4c4c4"/>
            </f7-block>
            <!-- Users Content-->
            <f7-card-header>{{$t('explorer.people').toUpperCase()}}</f7-card-header>
            <f7-card-content>
                <carousel
                        :scrollPerPage="false"
                        :perPageCustom="[[768, 3], [1024, 4]]"
                        :autoplay="true"
                        :perPage="4"
                        :paginationEnabled="false"
                        :autoplayTimeout="2000">
                    <slide v-for="user in users" :key="user.id">
                        <div class="avatar">
                            <img :src="user.cover_url" @click="routeToUser(user.id)"/>
                        </div>
                    </slide>
                </carousel>
            </f7-card-content>
        </div>
    </f7-card>
</template>
<script>
  import { Carousel, Slide } from 'vue-carousel'

  export default {
    computed: {
      brands () {
        return this.$store.state.brands
      },
      posts () {
        return this.$store.state.timeline
      },
      comments () {
        return this.$store.state.comments
      },
      users () {
        if (this.$store.getters.isLoggedIn) {
          return this.$store.state.users.filter(user => {
            return user.id !== this.$store.getters.user.id
          })
        } else {
          return this.$store.state.users
        }
      }
    },
    components: {
      Carousel,
      Slide
    },
    created () {
      this.$store.dispatch('getUsers')
      this.$store.dispatch('getComments')
    },
    methods: {
      getComments () {
        return this.comments
      },
      routeToPost (id) {
        this.$f7.mainView.router.load({url: `/post/?mid=${id}`})
      },
      routeToUser (id) {
        this.$f7.mainView.router.load({url: `/user/?uid=${id}`})
      },
      routeToModels (brand) {
        this.$f7.mainView.router.load({url: `/models/?bid=${brand.id}&brand=${brand.name}`})
      }
    },
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

    .explore-view {
        margin: 0 0 20px;
        font-family: 'open sans', arial, sans-serif;

        .more_btn {
            float: right;
            width: 80px;
        }
        .card-header {
            font-size: 15px;
            margin-top: 15px;
            background-color: @mainColor;
            color: #eeeeee;
            &:after {
                height: 0;
            }
            .user {
                justify-content: center;
                .time {
                    font-size: 12px;
                    color: #8999a5;
                    margin-top: 3px;
                }
                .name {
                    color: @mainColor;
                    font-weight: bold;
                    font-size: 14px;
                }
            }
        }
        .card-content {
            padding: 0 10px 0 10px;
            color: gray;
            text-align: center;
            .cover > img {
                width: 50px;
                height: 50px;
                padding: 10px;
                border-radius: 50%;
                border: solid #eeeeee;
            }
            .avatar > img {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                border: solid #eeeeee;
            }
            .text > p {
                margin-top: 0px;
                text-transform: uppercase;
                font-size: 12px;
            }
            .review {
                padding: 2px;
                background: #fff;
                box-sizing: border-box;
                border: 1px solid #ccc;
            }
            .review > img {
                text-align: center;
                width: 100%;
                display: block;
            }
        }
    }
</style>