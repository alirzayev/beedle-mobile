<template>
    <div class="card" @click="contentClick(data)">
        <div class="card-content">
            <div v-if="data.cover_url" class="image" @click.stop="openPhotoBrowser(data.cover_url)">
                <img :src="data.cover_url">
            </div>
        </div>
        <div class="card-header">
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
        <div class="card-footer flex-row" v-if="enableToolbar">
            <f7-button color="white" class="tool" :class="{liked: checkMyLike(data, user)}"
                       @click.stop="toggleLike(data.id, data.liked)">
                <span class="fonticon f7-icons">bolt</span>
                <span class="text" v-text="data.likes_count ? data.likes_count : $t('tweet.like')"></span>
            </f7-button>
            <f7-button v-if="data.user.id === user.id" color="white" class="tool"
                       @click.stop="">
                <span class="fonticon f7-icons">compose</span>
                <span class="text" v-text="$t('app.edit')"></span>
            </f7-button>
            <f7-button color="white" class="tool" @click.stop="openCommentPopup">
                <span class="fonticon f7-icons">chat</span>
                <span class="text" v-text="data.comments_count ? data.comments_count : $t('tweet.comment')"></span>
            </f7-button>
        </div>
    </div>
</template>

<script>
  import moment from 'moment'
  import { getRemoteAvatar } from '../utils/appFunc'
  export default {
    props: {
      data: {
        type: Object,
        default() {
          return {}
        }
      },
      enableToolbar: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      user(){
        return this.$store.getters.user
      }
    },
    methods: {
      contentClick(data) {
        this.$emit('card:content-click', data)
      },
      openPhotoBrowser(url) {
        let pb = this.$f7.photoBrowser({
          zoom: 400,
          theme: 'dark',
          photos: [url]
        })
        pb.open()
      },
      openCommentPopup() {
        this.$f7.popup('#commentPopup')
      },
      formatTime(time) {
        return moment(Date.parse(time)).fromNow()
      },
      getAvatar(id) {
        return getRemoteAvatar(id)
      },
      toggleLike(mid, status) {
        this.$store.dispatch('updateTimeline', {
          mid,
          type: status ? 'unlike' : 'like'
        })
      },
      checkMyLike(data, user) {
        data.likes.forEach(function (like) {
          if (like.user_id === user.id) {
            console.log('like', like)
            data.liked = true
            return data.liked
          }
        })
        return data.liked
      }
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
                    color: #ff9630;
                    font-weight: bold;
                    font-size: 14px;
                }
            }
        }
        .card-content {
            padding: 5px 10px;
            .image {
                margin: auto;
                width: 400px;
                padding: 10px;
                overflow: hidden;
                > img {
                    display: block;
                    width: 100%;
                    height: auto;
                    margin: -70px 0px -70px 0px;
                }
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
