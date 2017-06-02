<template>
    <f7-page class="post-page" navbar-fixed toolbar-fixed>
        <f7-navbar >
                <f7-nav-left>
                    <a href="#" class="back link">
                        <f7-icon f7="left"></f7-icon>
                        <span>{{$t('app.back')}}</span>
                    </a>
                </f7-nav-left>
            <f7-nav-center :title="$t('post.post')"></f7-nav-center>
        </f7-navbar>
        <card :enableToolbar="false" :data="post"></card>
        <div class="comments">
            <div class="title">
                <span>{{$t('tweet.comment')}}</span>
            </div>
            <div class="list">
                <template v-if="post.comments.length > 0">
                    <div class="comment flex-row" v-for="(comment, index) in post.comments" :key="comment.name">
                        <img class="avatar" :src="comment.owner.cover_url"/>
                        <div class="detail flex-rest-width">
                            <div class="name"><span>{{comment.owner.fullname}}</span></div>
                            <div class="time"><span>{{formatTime(comment.created_at)}}</span></div>
                            <div class="text"><span>{{comment.content}}</span></div>
                        </div>
                    </div>
                </template>
                <div class="empty-content" v-else>
                    <i class="iconfont icon-wujieguoyangshi"/>
                    <div class="text">
                        <span>{{$t('app.empty_container')}}</span>
                    </div>
                </div>
            </div>
        </div>
        <f7-toolbar class="custom-toolbar flex-row">
            <f7-link class="tool tool-border flex-rest-width" :class="{liked: checkMyLike(post,user)}"
                     @click="toggleLike(post.id, post.liked)">
                <span class="fonticon f7-icons">bolt</span>
                <span class="text" v-text="post.likes_count ? post.likes_count : $t('tweet.like')"></span>
            </f7-link>
            <f7-link class="tool flex-rest-width" :href="'/comment/?tid='+post.id">
                <span class="fonticon f7-icons">chat</span>
                <span class="text" v-text="post.comments_count ? post.comments_count : $t('tweet.comment')"></span>
            </f7-link>
        </f7-toolbar>
    </f7-page>
</template>


<script>
  import Card from '../components/card.vue'
  import moment from 'moment'
  import { getRemoteAvatar } from '../utils/appFunc'
  import { mapState } from 'vuex'
  import find from 'lodash/find'

  export default {
    data() {
      return {
        post: {},
        comments: []
      }
    },
    computed: {
      ...mapState({
        timeline: state => state.timeline,
      }),
      user(){
        return this.$store.getters.user
      }
    },
    mounted() {
      this.$nextTick(_ => {
        this.$store.dispatch('getTimeline', () => {
        })
      })
      this.$store.dispatch('getComments')
      let query = this.$route.query
      this.post = find(this.timeline, p => p.id === parseInt(query.mid))
    },
    methods: {
      formatTime(time) {
        return moment(Date.parse(time)).fromNow()
      },
      getAvatar(id) {
        return getRemoteAvatar(id)
      },
      openCommentPopup() {
        this.$f7.popup('#commentPopup')
      },
      toggleLike(mid, status) {
        this.$store.dispatch('updateTimeline', {
          mid,
          type: status ? 'unlike' : 'like'
        })
      },
      checkMyLike(data, user) {
        if (data.likes) {
          data.likes.forEach(function (like) {
            if (like.user_id === user.id) {
              console.log('like', like)
              data.liked = true
              return data.liked
            }
          })
        }
        return data.liked
      }
    },
    components: {
      Card
    }
  }
</script>

<style lang="less">
    @import "../assets/styles/mixins.less";

    .post-page {
        .red-color {
            color: red;
        }
        .custom-toolbar {
            background: #fff;
            &:before {
                background: #e1e1e1;
            }
            .tool {
                justify-content: center;
                &.tool-border {
                    border-right: 1px solid #e1e1e1;
                }
                &.liked {
                    > span {
                        color: @mainColor;
                    }
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
        .comments {
            background-color: #fff;
            border-top: 1px solid #dadada;
            border-bottom: 1px solid #dadada;
            margin-bottom: 15px;
            .title {
                height: 35px;
                line-height: 35px;
                padding: 0 10px;
                font-size: 13px;
            }
            .comment {
                border-top: 1px solid #dadada;
                padding: 10px;
                font-size: 14px;
                .avatar {
                    width: 30px;
                    height: 30px;
                    border-radius: 30px;
                }
                .detail {
                    margin-left: 8px;
                    .name {
                        font-size: 13px;
                        color: #333;
                    }
                    .time {
                        font-size: 11px;
                        color: #929292;
                        margin-bottom: 2px;
                    }
                    .text {
                        line-height: 20px;
                        color: #5d5d5d;
                    }
                }
            }
        }
    }
</style>
