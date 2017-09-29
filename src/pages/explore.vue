<template>
    <f7-card>
        <!-- Brands Content-->
        <div class="explore-view">
            <f7-card-header>Brands</f7-card-header>
            <f7-card-content>
                <f7-grid no-gutter>
                    <f7-col v-for="brand in brands" width="33">
                        <div @click="routeToPosts(brand)">
                            <div class="avatar">
                                <img :src="brand.cover_url"/>
                            </div>
                        </div>
                    </f7-col>
                </f7-grid>
            </f7-card-content>
            <f7-block>
                <hr size="1px" color="#c4c4c4"/>
            </f7-block>
            <!-- Review Content-->
            <f7-card-header>Review</f7-card-header>
            <f7-card-content class="review">
                <div class="swiper-container swiper-3">
                    <div class="swiper-pagination"></div>
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="comment in comments">
                            <img @click="routeToPost(comment.topic.id)" :src="comment.topic.model.cover_url"/>
                        </div>
                    </div>
                </div>
            </f7-card-content>
            <f7-block>
                <hr size="1px" color="#c4c4c4"/>
            </f7-block>
            <!-- Users Content-->
            <f7-card-header>People</f7-card-header>
            <f7-card-content>
                <f7-grid no-gutter>
                    <f7-col v-for="user in users" width="20">
                        <div class="avatar">
                            <div class="test">
                                <img :src="user.cover_url" @click="routeToUser(user.id)"/>
                            </div>
                        </div>
                    </f7-col>
                </f7-grid>
            </f7-card-content>
            <f7-block>
                <hr size="1px" color="#c4c4c4"/>
            </f7-block>
        </div>
    </f7-card>
</template>
<script>
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
        return this.$store.state.users
      }
    },
    created () {
      this.$store.dispatch('getUsers')
      this.$store.dispatch('getComments')
    },
    mounted () {
      this.$store.dispatch('getComments')
      setInterval(() => {
        this.$f7.swiper('.swiper-3', {
          spaceBetween: 10,
          slidesPerView: 3,
        })
      }, 3)
    },
    methods: {
      routeToPost (id) {
        this.$f7.mainView.router.load({url: `/post/?mid=${id}`})
      },
      routeToUser (id) {
        this.$f7.mainView.router.load({url: `/user/?uid=${id}`})
      },
      routeToPosts (brand) {
        this.$f7.mainView.router.load({url: `/posts/?bid=${brand.id}&brand=${brand.name}`})
      }
    },
  }
</script>
<style lang="less">
    @import "../assets/styles/mixins.less";

    .explore-view {
        margin: 0px 0px 20px;
        .card-header {
            margin-top: 40px;
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
            padding: 5px 10px;
            color: gray;
            text-align: center;
            .avatar > img {
                width: 50px;
                height: 50px;
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
            .swiper-slide {
                padding: 2px;
                background: #fff;
                box-sizing: border-box;
                border: 1px solid #ccc;
            }
            .swiper-slide > img {
                text-align: center;
                width: 100%;
                display: block;
            }
            .swiper-container {
            }
        }
    }
</style>