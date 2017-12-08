<template>
    <!-- Search bar -->
    <f7-page class="brands-page">
        <f7-navbar>
            <f7-nav-left>
                <a href="#" class="back link">
                    <f7-icon f7="left"></f7-icon>
                    <span>{{$t('app.back')}}</span>
                </a>
            </f7-nav-left>
            <f7-nav-center :title="$t('explorer.people')"></f7-nav-center>
        </f7-navbar>

        <f7-searchbar
                cancel-link="Cancel"
                search-list=".list-block-search"
                placeholder="Search user.."
                searchIn=".item-title"
                :clear-button="true"
                @searchbar:search="onSearch"
                @searchbar:enable="onEnable"
                @searchbar:disable="onDisable"
                @searchbar:clear="onClear"
        ></f7-searchbar>

        <!-- Will be visible if there is no any results found, defined by "searchbar-not-found" class -->
        <f7-list class="searchbar-not-found">
            <f7-list-item title="Nothing found"></f7-list-item>
        </f7-list>

        <!-- Search-through list -->
        <f7-list class="searchbar-found list-block-search">
            <f7-list-item v-for="user in users" :title="user.fullname" :media="getCover(user.cover_url)"
                          :link="goToUser(user.id)"></f7-list-item>
        </f7-list>
    </f7-page>
</template>
<script>
  export default {
    computed: {
      users () {
        return this.$store.state.users
      }
    },
    methods: {
      onSearch: function (query, found) {
        console.log('search', query)
      },
      onClear: function (event) {
        console.log('clear', event)
      },
      onEnable: function (event) {
        console.log('enable')
      },
      onDisable: function (event) {
        console.log('disable')
      },
      getCover (url) {
        return `<img class='avatar' src='${url}' />`
      },
      goToModels (brand) {
        return `/models/?bid=${brand.id}&brand=${brand.name}`
      },
      goToUser (id) {
        return `/user/?uid=${id}`
      },
    },
    created () {
      this.$store.dispatch('getUsers')
    },
    beforeDestroy () {
      this.$store.dispatch('getUsers', {paginate: 8})
    }
  }
</script>
<style lang="less">
    .brands-page {
        .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: solid #eeeeee;
        }
    }
</style>