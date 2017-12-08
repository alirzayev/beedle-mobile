<template>
    <f7-card>
        <!-- Brands Content-->
        <div class="explore-view">
            <f7-card-header>
                <div class="text">
                    {{$t('app.brands').toUpperCase()}}
                </div>
                <div class="more_btn">
                    <f7-button href="/brands/" fill color="black" round>All</f7-button>
                </div>
            </f7-card-header>
            <f7-card-content>
                <f7-grid>
                    <f7-col v-for="brand in brands" :key="brand.id" width="33">
                        <div @click="routeToModels(brand)">
                            <div class="cover">
                                <img :src="brand.cover_url"/>
                            </div>
                        </div>
                    </f7-col>
                </f7-grid>
            </f7-card-content>
            <!-- Review Content-->
            <f7-card-header>{{$t('explorer.reviews').toUpperCase()}}</f7-card-header>
            <f7-card-content>
                <f7-grid>
                    <f7-col v-for="comment in comments" :key="comment.id" width="25">
                        <div class="review" @click="routeToPost(comment.topic.id)" v-if="comment.topic.cover">
                            <img :src="comment.topic.cover_url"/>
                        </div>
                    </f7-col>
                </f7-grid>
            </f7-card-content>
            <!-- Users Content-->
            <f7-card-header>
                <div class="text">
                    {{$t('explorer.people').toUpperCase()}}
                </div>
                <div class="more_btn">
                    <f7-button href="/users/" fill color="black" round>All</f7-button>
                </div>
            </f7-card-header>
            <f7-card-content>
                <f7-grid>
                    <f7-col v-for="user in users" :key="user.id" width="25">
                        <div @click="routeToUser(user.id)">
                            <div class="cover">
                                <img :src="user.cover_url"/>
                            </div>
                        </div>
                    </f7-col>
                </f7-grid>
            </f7-card-content>
        </div>
    </f7-card>
</template>
<script>
  import { Carousel, Slide } from 'vue-carousel'

  export default {
    computed: {
      brands () {
        return this.$store.state.brands.slice(0, 5)
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
      this.$store.dispatch('getUsers', {paginate: 8})
      this.$store.dispatch('getComments')
      this.$store.dispatch('getBrands')
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

    .explore-view {
        margin: 0 0 20px;

        .card-header {
            font-size: 15px;
            background-color: @mainColor;
            color: white;
            .text {
                width: 85%;
            }
            .more_btn {
                width: 15%;
            }
        }
        .card-content {
            color: gray;
            text-align: center;
            .cover > img {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                border: solid #eeeeee;
            }
            .review > img {
                width: 60px;
                height: 60px;
                border: solid #eeeeee;
            }
            .text > p {
                text-transform: uppercase;
                font-size: 12px;
            }
        }
    }
</style>