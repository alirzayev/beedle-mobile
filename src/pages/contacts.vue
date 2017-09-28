<template>
    <f7-page class="contacts-view">
        <f7-navbar>
            <f7-nav-left>
                <a href="#" class="back link">
                    <f7-icon f7="left"></f7-icon>
                    <span>{{$t('app.back')}}</span>
                </a>
            </f7-nav-left>
            <f7-nav-center :title="$t('app.chat')"></f7-nav-center>
        </f7-navbar>

        <f7-list contacts>
            <f7-list-group>
                <f7-list-item v-if="contact.receiver.id === user.id" v-for="contact in conversations"
                              :link="getLink(contact.user)"
                              :key="contact.user.fullname"
                              :title="contact.user.fullname"
                              :media="getAvatarMedia(contact.user.cover_url)"
                ></f7-list-item>
                <f7-list-item v-if="contact.receiver.id !== user.id" v-for="contact in conversations"
                              :link="getLink(contact.receiver)"
                              :key="contact.receiver.fullname"
                              :title="contact.receiver.fullname"
                              :media="getAvatarMedia(contact.receiver.cover_url)"
                ></f7-list-item>
            </f7-list-group>
        </f7-list>
    </f7-page>
</template>

<style lang="less">
    .contacts-view {
        .contacts-block {
            margin: 20px 0;
            .list-group-title {
                line-height: 25px;
                height: 25px;
                background: #f7f7f7;
                color: #8e8e93;
                font-weight: normal !important;
                font-size: 14px;
            }
            .item-media {
                > img {
                    width: 35px;
                    height: 35px;
                }
            }
        }
    }
</style>

<script>
  import messageServices from '../api/message'

  export default {
    data () {
      return {
        conversations: []
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      }
    },
    mounted () {
      messageServices.conversations().then((response) => {
        this.conversations = response.body.conversations
      })
      this.$store.dispatch('getAuthUser').then(() => {
        console.log('conversations', this.user)
      })
    },
    methods: {
      getAvatarMedia (imageUrl) {
        return `<img class='avatar' src='${imageUrl}' />`
      },
      getLink (receiver) {
        return `/message/?uid=${receiver.id}&nickname=${receiver.fullname}`
      }
    }
  }
</script>