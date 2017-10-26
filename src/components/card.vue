<template>
    <div class="card" @click="contentClick(data)">
        <div v-if="data.user" class="card-header">
            <div class="avatar">
                <img :src="data.user.cover_url" alt="avatar">
            </div>
            <div class="user flex-column">
                <div class="name">{{data.user.fullname}}</div>
                <div class="time">{{`#${data.id} `}}{{formatTime(data.created_at)}}</div>
            </div>
        </div>
        <div class="card-content">
            <div class="text">{{data.content}}</div>
        </div>
        <div class="card-content">
            <div v-if="data.cover_url" class="image" @click.stop="openPhotoBrowser(data.cover_url)">
                <img :src="data.cover_url">
            </div>
        </div>
        <div class="card-footer flex-row" v-if="enableToolbar">
            <f7-button v-if="isLoggedIn && data" color="white" class="tool" :class="{liked: isMyLike(data, user)}"
                       @click.stop="toggleLike(data.id, data.liked)">
                <span class="fonticon f7-icons">bolt</span>
                <span class="text" v-text="data.likes_count ? data.likes_count : $t('app.trend')"></span>
            </f7-button>
            <f7-button disabled v-else color="white" class="tool">
                <span class="fonticon f7-icons">bolt</span>
                <span class="text" v-text="data.likes_count ? data.likes_count : $t('app.trend')"></span>
            </f7-button>
            <!-- <f7-button v-if="isLoggedIn && isMyPost(data.user)" color="white" class="tool"
                        @click.stop="">
                 <span class="fonticon f7-icons">compose</span>
                 <span class="text" v-text="$t('app.edit')"></span>
             </f7-button>-->
            <f7-button color="white" class="tool" @click.stop="openCommentPopup">
                <span class="fonticon f7-icons">chat</span>
                <span class="text" v-text="data.comments_count ? data.comments_count : $t('tweet.comment')"></span>
            </f7-button>
        </div>
    </div>
</template>

<script>
  import moment from 'moment'
  import topicServices from '../api/topic'
  import { getRemoteAvatar } from '../utils/appFunc'

  export default {
    props: {
      data: {
        type: Object,
        default () {
          return {}
        }
      },
      enableToolbar: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      isLoggedIn () {
        return this.$store.getters.isLoggedIn
      },
      user () {
        return this.$store.getters.user
      }
    },
    methods: {
      contentClick (data) {
        this.$emit('card:content-click', data)
      },
      openPhotoBrowser (url) {
        let pb = this.$f7.photoBrowser({
          zoom: 400,
          theme: 'dark',
          photos: [url]
        })
        pb.open()
      },
      openCommentPopup () {
        this.$f7.popup('#commentPopup')
      },
      formatTime (time) {
        return moment(Date.parse(time)).fromNow()
      },
      getAvatar (id) {
        return getRemoteAvatar(id)
      },
      toggleLike (mid, liked) {
        if (!liked) {
          return topicServices.like(mid)
            .then((response) => {
              console.log('I like it', response)
              this.$bus.$emit('refreshPosts')
            })
        } else {
          return topicServices.dislike(mid)
            .then((response) => {
              console.log('I dislike it', response)
              this.$bus.$emit('refreshPosts')
            })
        }
      },
      isMyLike (data, user) {
        data.likes.filter(function (like) {
          if (like.user_id === user.id.toString()) {
            data.liked = true
            return like
          }
        })
        return data.liked
      },
      /*isMyPost (user) {
        if (this.user.id === user.id) {
          return true
        } else {
          return false
        }
      }*/
    }
  }
</script>

<style lang="less">
    @import "../assets/styles/mixins.less";

    .card {
        background-color: white;
        margin: 15px 0;
        border-top: 1px solid #dadada;
        border-bottom: 1px solid #dadada;
        box-shadow: none;
        .card-header {
            padding: 10px;
            padding-bottom: 5px;
            justify-content: inherit;
            align-items: inherit;
            &:after {
                height: 0;
            }
            .avatar, .avatar > img {
                width: 40px;
                height: 40px;
                border-radius: 4px;
                margin-right: 9px;
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
            .image {
                margin: auto;
                width: 100%;
                overflow: hidden;
                > img {
                    display: block;
                    width: 100%;
                    height: auto;
                    margin: -70px 0px -70px 0px;
                }
            }
            .text {
                padding: 10px;
            }
        }
        .card-footer {
            background-color: #f5f5f5;
            min-height: 35px;
            padding: 0;
            a.link {
                line-height: 35px;
                height: 35px;
            }
            .tool {
                justify-content: center;
                width: auto;
                margin: 8px;
                &.tool-border {
                    border-right: 1px solid #e1e1e1;
                }
                &.liked {
                    background-color: @mainColor;
                    > span {
                        color: white;
                        vertical-align: middle;
                    }
                }
                > span {
                    color: #6D6D78;
                    vertical-align: middle;
                }
                .iconfont {
                    font-size: 16px;
                }
                .text {
                    font-size: 13px;
                }
            }
        }
    }
</style>
