<template>
    <div class="home-view">
        <f7-toolbar tabbar>
            <f7-link tab-link="#trending" class="tool tool-border" :class="{pressed: pressed.trending}">TRENDING
            </f7-link>
            <f7-link tab-link="#recent" class="tool" :class="{pressed: pressed.recent}">RECENT</f7-link>
        </f7-toolbar>
        <f7-tabs swipeable>
            <f7-tab id="trending" active @tab:show="tabActived('trending')">
                <card v-for="(trend, index) in trends" :key="trend.id" :data="trend"
                      @card:content-click="routeToPost"></card>
            </f7-tab>

            <f7-tab id="recent" @tab:show="tabActived('recent')">
                <card v-for="(item, index) in timeline" :key="item.id" :data="item"
                      @card:content-click="routeToPost"></card>
            </f7-tab>
        </f7-tabs>
    </div>
</template>

<style lang="less">

</style>

<script>
  import Card from '../components/card.vue'
  import topicServices from '../api/topic'

  export default {
    data () {
      return {
        pressed: {
          'trending': true,
          'recent': false,
        },
      }
    },
    computed: {
      isLoggedIn () {
        return this.$store.getters.isLoggedIn
      },
      user () {
        return this.$store.getters.user
      },
      timeline () {
        return this.$store.state.timeline
      },
      trends () {
        return this.$store.state.trends
      }
    },
    created () {
      this.refresh()
      this.$bus.$on('refreshPosts', this.refresh)
      this.$bus.$on('routeToPost', this.routeToPost)
      this.$bus.$on('trendClick', this.makeTrend)
    },
    methods: {
      routeToPost (data) {
        this.$f7.mainView.router.load({url: `/post/?mid=${data.id}`})
      },
      tabActived (tab) {
        if (tab === 'trending') {
          this.pressed.trending = true
          this.pressed.recent = false
        } else {
          this.pressed.trending = false
          this.pressed.recent = true
        }
      },
      makeTrend (mid) {
        return topicServices.like(mid)
          .then((response) => {
            console.log('I like it', response)
            this.refresh()
          })
      },
      refresh () {
        this.$nextTick(function () {
          this.$f7.showIndicator()
          // - if it is authenticated
          if (this.isLoggedIn && this.user.car) {
            this.$store.dispatch('getTimeline', this.user.car.model_id).then(() => {
              this.$f7.hideIndicator()
            })
            this.$store.dispatch('getTrends', this.user.car.model_id).then(() => {
              this.$f7.hideIndicator()
            })
          } else { // not authenticated
            console.log('not loggedIn')
            this.$store.dispatch('getTrends', null).then(() => {
              this.$f7.hideIndicator()
            })
            this.$store.dispatch('getTimeline', null).then(() => {
              this.$f7.hideIndicator()
            })
          }
        })
      }
    },
    components: {
      Card
    }
  }
</script>

<style lang="less">
    @import "../assets/styles/mixins.less";

    .home-view {
        margin-bottom: 40px;
        .tool {
            font-size: 12px;
            justify-content: center;
            &.tool-border {
                border-right: 1px solid #e1e1e1;
            }
            &.pressed {
                border-bottom: 2px solid @mainColor;
            }
            > span {
                color: #6D6D78;
                vertical-align: middle;
            }
            .iconfont {
                font-size: 18px;
            }
            .text {
                font-size: 15px;
            }
        }
    }

</style>