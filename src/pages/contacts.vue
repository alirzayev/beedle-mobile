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
        <f7-list-group v-for="(group, key) in contacts" :key="key">
          <f7-list-item :title="key" group-title></f7-list-item>
          <f7-list-item v-for="contact in group" 
            :link="getLink(contact.nickname)"
            :key="contact.nickname" 
            :title="contact.nickname" 
            :after="contact.location"
            :media="getAvatarMedia(contact.avatar)"
          ></f7-list-item>
        </f7-list-group>
      </f7-list>
    </f7-page>
</template>

<style lang="less">
.contacts-view{
  .contacts-block{
    margin: 20px 0;
    .list-group-title{
      line-height: 25px;
      height: 25px;
      background: #f7f7f7;
      color: #8e8e93;
      font-weight: normal !important;
      font-size: 14px;
    }
    .item-media{
      > img {
        width: 35px;
        height: 35px;
      }
    }
  }
} 
</style>

<script>
import {mapState} from 'vuex'
import groupBy from 'lodash/groupBy'
import {getRemoteAvatar} from '../utils/appFunc'
export default {
  computed: {
    ...mapState({
      contacts: state => groupBy(state.contacts, 'header'),
    })
  },
  mounted() {
    this.$store.dispatch('getContacts')
  },
  methods: {
    getAvatarMedia(id) {
      return `<img class='avatar' src='${getRemoteAvatar(id)}' />`
    },
    getLink(name) {
      return `/message/?nickname=${name}`
    }
  }
}
</script>