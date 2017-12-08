<template>
    <div class="search-view">
        <!-- Search bar -->
        <f7-searchbar
                cancel-link="Cancel"
                search-list="#search-list"
                placeholder="Search posts"
                :clear-button="true"
                @searchbar:search="onSearch"
                @searchbar:enable="onEnable"
                @searchbar:disable="onDisable"
                @searchbar:clear="onClear"
        ></f7-searchbar>

        <f7-list media-list class="searchbar-found list-block" id="search-list">
            <f7-list-item class="" v-for="item in filteredPosts">
                <div slot="inner">
                    <div class="item-title">
                        <card :key="item.id" :data="item"
                              @card:content-click="routeToPost"></card>
                    </div>
                </div>
            </f7-list-item>
        </f7-list>
    </div>
</template>

<style lang="less">

</style>

<script>
  /* eslint-disable curly */

  import Card from '../components/card.vue'

  export default {
    computed: {
      isLoggedIn () {
        return this.$store.getters.isLoggedIn
      },
      user () {
        return this.$store.getters.user
      },
      filteredPosts () {
        return this.$store.state.filteredData
      }
    },
    mounted () {
      this.$store.dispatch('getFilteredPosts', null).then(() => {
        this.$f7.hideIndicator()
      })
    },
    methods: {
      routeToPost (data) {
        this.$f7.mainView.router.load({url: `/post/?mid=${data.id}`})
      },
      onSearch: function (query) {
        console.log('search', query)
      },
      onClear: function (event) {
        console.log('clear')
      },
      onEnable: function (event) {
        console.log('enable')
      },
      onDisable: function (event) {
        console.log('disable')
      }
    },
    components: {
      Card
    }
  }
</script>

<style lang="less">
    @import "../assets/styles/mixins.less";

    .search-view {
        margin: 0px;
        padding: 0px;
        background-color: #eeeeee;
    }

</style>