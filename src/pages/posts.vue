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
                    :title="title"></f7-nav-center>
            <f7-nav-right>
                <f7-link v-if="isLoggedIn && $route.query.bid" @click="makeFavourite($route.query.bid)"
                         :icon-f7="isMyFavourite(this.$route.query.bid) ? 'favorites_fill' : 'favorites'"></f7-link>
            </f7-nav-right>
        </f7-navbar>
        <card v-for="post in posts" :key="post.id" :data="post" @card:content-click="routeToPost"></card>
    </f7-page>
</template>
<script>
  import Card from '../components/card.vue'
  import favServices from '../api/favourite'
  import userServices from '../api/user'

  export default {
    data () {
      return {
        fav: null,
        title: '',
        posts: [],
        interests: [],
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      isLoggedIn () {
        return this.$store.getters.isLoggedIn
      }
    },
    created () {
      this.refresh()
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
      refresh () {
        let query = this.$route.query
        this.$nextTick(function () {
          this.$f7.showIndicator()
          if (query.mid) {
            this.$store.dispatch('getTimeline', query.mid).then(() => {
              this.posts = this.$store.state.timeline
              this.title = query.model
              this.$f7.hideIndicator()
            })
          }
          if (query.uid) {
            userServices.user(query.uid).then((response) => {
              this.title = response.body.user.fullname
              this.posts = response.body.user.topics
              console.log('user topics', response.body.user.topics)
              this.$f7.hideIndicator()
            })
          }
          if (query.bid) {
            this.$store.dispatch('getBrandTopics', query.bid).then(() => {
              this.posts = this.$store.state.timeline
              this.title = query.brand
              this.$f7.hideIndicator()
            })
          }
        })
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