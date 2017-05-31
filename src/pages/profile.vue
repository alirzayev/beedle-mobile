<template>
  <f7-page class="profile-page">
    <f7-navbar :title="$t('app.profile')" :back-link="$t('app.back')" sliding></f7-navbar>
    <f7-list>
        <f7-list-item :title="$t('app.avatar')" class="avatar-content">
            <img class="avatar" slot="after" :src="userInfo.cover_url"/>
        </f7-list-item>
        <f7-list-item :title="$t('app.name')" :after="userInfo.fullname"></f7-list-item>
    </f7-list>
    <f7-list>
        <f7-list-item :title="$t('app.gender')" :after="formatGender(userInfo.fullname)"></f7-list-item>
        <f7-list-item :title="$t('app.location')" :after="userInfo.fullname"></f7-list-item>
    </f7-list>
  </f7-page>
</template>

<style lang="less">
    .profile-page{
        .list-block{
            margin: 20px 0;
            .avatar-content{
                .item-after{
                    max-height: inherit;
                }
                .avatar{
                    width: 65px;
                    height: 65px;
                    border-radius: 5px;
                }
            }
        }
    }
</style>

<script>
export default {
  computed: {
    userInfo() {
      return this.$store.getters.user
    }
  },
  methods: {
    formatGender(gender) {
      if(gender === 'm') return this.$t('app.male')
      else if(gender === 'f') return this.$t('app.female')
      else return this.$t('app.unknown')
    }
  }
}
</script>