<template>
    <f7-page navbar-fixed>
        <f7-navbar theme="white">
            <f7-nav-left>
                <a href="#" class="back link">
                    <f7-icon f7="left"></f7-icon>
                    <span>{{$t('app.back')}}</span>
                </a>
            </f7-nav-left>
            <f7-nav-center :title="this.$route.query.brand"></f7-nav-center>
            <f7-nav-right>
                <f7-link @click="makeFavourite($route.query.bid)"
                         :icon-f7="fav ? 'favorites_fill' : 'favorites'"></f7-link>
            </f7-nav-right>
        </f7-navbar>

        <f7-page>
            <card v-for="(item, index) in posts" :key="item.id" :data="item"></card>
        </f7-page>
    </f7-page>
</template>
<script>
  import Card from '../components/card.vue'
  import favServices from '../api/favourite'
  import userServices from '../api/auth'

  export default {
    data () {
      return {
        fav: false,
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
      }
    },
    created () {
      userServices.user(this.user.id).then((response) => {
        this.interests = response.body.interests
      })
      this.checkFavourite(this.$route.query.bid)
    },
    mounted () {
      let query = this.$route.query
      this.$nextTick(function () {
        this.$f7.showIndicator()
        this.$store.dispatch('getBrandTopics', query.bid).then(() => {
          this.timeline = this.$store.state.timeline
          this.$f7.hideIndicator()
        })
      })
    },
    components: {
      Card
    },
    methods: {
      avatarMedia (url) {
        return `<img class='avatar' src='${url}' />`
      },
      makeFavourite (id) {
        if (!this.fav) {
          favServices.create({'brand_id': id}).then((response) => {
            this.fav = true
          })
        } else {
          favServices.delete(id).then((response) => {
            this.fav = false
          })
        }
        this.$bus.$emit('refreshUserData')
      },
      checkFavourite (id) {
        for (var i = 0; i < this.interests.length; i++) {
          if (this.interests[i].brand_id === parseInt(id)) {
            this.fav = true
            break
          }
        }
      }
    }
  }
</script>
<style lang="less">
    .notification {
        font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;

        .item-content {
            padding: 5px 10px;
        }
        .avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
        .detail {
            .fullname {
                font-size: 14px;
                margin-top: 5px;
            }
            .subtext {
                color: #858585;
                font-size: 12px;
                margin-top: 5px;
            }
        }
    }
</style>