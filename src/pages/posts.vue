<template>
    <f7-page navbar-fixed>
        <f7-navbar theme="white">
            <f7-nav-left>
                <a href="#" class="back link">
                    <f7-icon f7="left"></f7-icon>
                    <span>{{$t('app.back')}}</span>
                </a>
            </f7-nav-left>
            <f7-nav-center
                    :title="this.$route.query.brand?this.$route.query.brand:this.$route.query.model"></f7-nav-center>
            <f7-nav-right>
                <f7-link v-if="isLoggedIn && $route.query.bid" @click="makeFavourite($route.query.bid)"
                         :icon-f7="isMyFavourite(this.$route.query.bid) ? 'favorites_fill' : 'favorites'"></f7-link>
            </f7-nav-right>
        </f7-navbar>

        <card v-for="(item, index) in posts" :key="item.id" :data="item" @card:content-click="routeToPost"></card>
    </f7-page>
</template>
<script>
  import Card from '../components/card.vue'
  import favServices from '../api/favourite'

  export default {
    data () {
      return {
        fav: null,
        timeline: [],
        interests: [],
      }
    },
    computed: {
      posts () {
        return this.timeline
      },
      user () {
        return this.$store.getters.user
      },
      isLoggedIn () {
        return this.$store.getters.isLoggedIn
      }
    },
    created () {
      let query = this.$route.query
      this.$nextTick(function () {
        this.$f7.showIndicator()
        if (query.mid) {
          this.$store.dispatch('getTimeline', query.mid).then(() => {
            this.timeline = this.$store.state.timeline
            this.$f7.hideIndicator()
          })
        } else {
          this.$store.dispatch('getBrandTopics', query.bid).then(() => {
            this.timeline = this.$store.state.timeline
            this.$f7.hideIndicator()
          })
        }
      })
    },
    beforeDestroy () {
      this.$bus.$emit('refreshPosts')
    },
    components: {
      Card
    },
    methods: {
      avatarMedia (url) {
        return `<img class='avatar' src='${url}' />`
      },
      makeFavourite (id) {
        if (!this.isMyFavourite(id)) {
          favServices.create({'brand_id': id}).then((response) => {
            console.log('add to favourites')
            this.$bus.$emit('refresh-user')
          })
        } else {
          favServices.delete(id).then((response) => {
            console.log('remove from favourites')
            this.$bus.$emit('refresh-user')
          })
        }
      },
      isMyFavourite (id) {
        if (this.user.interests) {
          for (let i = 0; i < this.user.interests.length; i++) {
            if (this.user.interests[i].brand_id === parseInt(id)) {
              return true
            }
          }
        }
        return false
      },
      routeToPost (data) {
        this.$f7.mainView.router.load({url: `/post/?mid=${data.id}`})
      },
    }
  }
</script>