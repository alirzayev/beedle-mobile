<template>
    <f7-page class="post-page" navbar-fixed toolbar-fixed>
        <f7-navbar>
            <f7-nav-left>
                <a href="#" class="back link">
                    <f7-icon f7="left"></f7-icon>
                    <span>{{$t('app.back')}}</span>
                </a>
            </f7-nav-left>
            <f7-nav-center :title="$t('post.post')"></f7-nav-center>
            <f7-nav-right>
                <f7-link open-popover>
                    <f7-icon f7="flag"></f7-icon>
                </f7-link>
                <!-- Popover -->
                <f7-popover>
                    <!-- Popover content goes here -->
                    <f7-list>
                        <f7-list-button open-popup="#reportUserPopup" close-popover>Report User</f7-list-button>
                        <f7-list-button open-popup="#reportTopicPopup" close-popover>Report Topic</f7-list-button>
                    </f7-list>
                </f7-popover>
            </f7-nav-right>
        </f7-navbar>
        <card :enableToolbar="false" :data="post"></card>
        <div class="comments">
            <div class="title">
                <span>{{$t('tweet.comment')}}</span>
            </div>
            <div class="list">
                <div v-if="post.comments">
                    <div class="comment flex-row" v-for="(comment, index) in getComments" :key="comment.name">
                        <img class="avatar" :src="comment.owner.cover_url"/>
                        <div class="detail flex-rest-width">
                            <div class="name"><span>{{comment.owner.fullname}}</span></div>
                            <div class="time"><span>{{formatTime(comment.created_at)}}</span></div>
                            <div class="text"><span>{{comment.content}}</span></div>
                        </div>
                    </div>
                </div>
                <div class="empty-content" v-else>
                    <i class="iconfont icon-wujieguoyangshi"/>
                    <div class="text">
                        <span>{{$t('app.empty_container')}}</span>
                    </div>
                </div>
            </div>
        </div>
        <f7-toolbar v-if="post && user" class="custom-toolbar flex-row">
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

        <!-- Report Topic Popup -->
        <f7-popup tablet-fullscreen id="reportTopicPopup">
            <!-- Popup content goes here -->
            <div class="content-block-title">Why are you flagging this?</div>
            <f7-list form class="list-block media-list">
                <f7-list-item radio name="report-radio" value="Off-topic">
                    <div class="item-title-row">
                        <div class="item-title">Off-topic</div>
                    </div>
                    <div class="item-text">The content is off-topic and should probably be moved.</div>
                </f7-list-item>
                <f7-list-item radio name="report-radio" value="Inappropriate Content" checked>
                    <div class="item-title-row">
                        <div class="item-title">Inappropriate</div>
                    </div>
                    <div class="item-text">This content is offensive, abusive or does not folow our guidelines</div>
                </f7-list-item>
                <f7-list-item radio name="report-radio" value="Spam">
                    <div class="item-title-row">
                        <div class="item-title">Spam</div>
                    </div>
                    <div class="item-text">
                        This content is advertisement, it is not useful or relevant, but promotional in nature.
                    </div>
                </f7-list-item>
                <f7-list-item>
                    <div class="row">
                        <div class="col-50">
                            <f7-button close-popup class="button-big" color="blue">Cancel</f7-button>
                        </div>
                        <div class="col-50">
                            <f7-button @click="reportTopic" class="button-big" color="green" bg="white">Report
                            </f7-button>
                        </div>
                    </div>
                </f7-list-item>

            </f7-list>
        </f7-popup>
        <!-- Report User Popup -->
        <f7-popup tablet-fullscreen id="reportUserPopup">
            <!-- Popup content goes here -->
            <div class="content-block-title">Why are you flagging this?</div>
            <f7-list form class="list-block media-list">
                <f7-list-item radio name="report-user-radio" value="Violence" checked>
                    <div class="item-title-row">
                        <div class="item-title">Violence</div>
                    </div>
                    <div class="item-text">This user is hatefull, abusive or does not folow our guidelines</div>
                </f7-list-item>
                <f7-list-item radio name="report-user-radio" value="Spammer">
                    <div class="item-title-row">
                        <div class="item-title">Spammer</div>
                    </div>
                    <div class="item-text">
                        This user is spammer, it is not useful or relevant, but promotional in nature.
                    </div>
                </f7-list-item>
                <f7-list-item radio name="report-user-radio" value="Other">
                    <div class="item-title-row">
                        <div class="item-title">Other</div>
                    </div>
                </f7-list-item>
                <f7-list-item>
                    <div class="row">
                        <div class="col-50">
                            <f7-button close-popup class="button-big" color="blue">Cancel</f7-button>
                        </div>
                        <div class="col-50">
                            <f7-button @click="reportUser" class="button-big" color="green" bg="white">Report
                            </f7-button>
                        </div>
                    </div>
                </f7-list-item>

            </f7-list>
        </f7-popup>

    </f7-page>
</template>


<script>
  import Card from '../components/card.vue'
  import moment from 'moment'
  import notificationServices from '../api/notifications'
  import topicServices from '../api/topic'
  import userServices from '../api/user'
  import { getRemoteAvatar } from '../utils/appFunc'
  import { mapState } from 'vuex'
  import find from 'lodash/find'

  export default {
    data () {
      return {
        post: {},
        comments: []
      }
    },
    computed: {
      ...mapState({
        timeline: state => state.timeline,
      }),
      user () {
        return this.$store.getters.user
      },
      getComments () {
        return this.comments
      }
    },
    mounted () {
      let query = this.$route.query
      this.$store.dispatch('getComments')
      this.post = find(this.timeline, p => p.id === parseInt(query.mid))
      this.comments = this.post.comments

      if (this.user === this.post.user) {
        notificationServices.update(query.mid)
          .then((response) => {
            console.log('notification is updated', response.body)
          })
      }
    },
    methods: {
      formatTime (time) {
        return moment(Date.parse(time)).fromNow()
      },
      getAvatar (id) {
        return getRemoteAvatar(id)
      },
      openCommentPopup () {
        this.$f7.popup('#commentPopup')
      },
      toggleLike (mid, status) {
        this.$store.dispatch('updateTimeline', {
          mid,
          type: status ? 'unlike' : 'like'
        })
      },
      checkMyLike (data, user) {
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
      },
      refresh () {
        this.$bus.$emit('refreshPosts')
      },
      reportTopic () {
        this.$f7.showIndicator()
        let report = this.$$('input[name="report-radio"]:checked').val()
        topicServices.report({topic_id: this.post.id, reason: report}).then(() => {
          this.$f7.hideIndicator()
          this.$f7.alert('Topic is reported successfully!', 'Report')
        })
      },
      reportUser () {
        this.$f7.showIndicator()
        let report = this.$$('input[name="report-user-radio"]:checked').val()
        userServices.report({user_id: this.post.user_id, reason: report}).then(() => {
          this.$f7.hideIndicator()
          this.$f7.alert('User is reported successfully!', 'Report')
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

    .popover {
        width: 200px;
    }

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
