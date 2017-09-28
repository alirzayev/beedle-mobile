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
        </f7-navbar>

        <f7-page>
            <card v-for="(item, index) in posts" :key="item.id" :data="item"></card>
        </f7-page>
    </f7-page>
</template>
<script>
  import Card from '../components/card.vue'

  export default {
    data () {
      return {
        timeline: []
      }
    },
    computed: {
      posts () {
        return this.timeline
      },
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