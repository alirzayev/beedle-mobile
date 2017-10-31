<template>
    <!-- Search bar -->
    <f7-page class="model-page">
        <f7-navbar>
            <f7-nav-left>
                <a href="#" class="back link">
                    <f7-icon f7="left"></f7-icon>
                    <span>{{$t('app.back')}}</span>
                </a>
            </f7-nav-left>
            <f7-nav-center :title="$t('app.models')"></f7-nav-center>
        </f7-navbar>

        <f7-searchbar
                cancel-link="Cancel"
                search-list="#search-list"
                placeholder="Search model.."
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
        <f7-list class="searchbar-found" id="search-list">
            <f7-list-item title="All"
                          :link="goToAllTopics()"></f7-list-item>
            <f7-list-item v-for="item in models" :title="item.name"
                          :link="goToModelTopics(item)"></f7-list-item>
        </f7-list>
    </f7-page>
</template>
<script>
  export default {
    data: function () {
      return {
        items: []
      }
    },
    computed: {
      models: {
        get () {
          return this.$store.state.models
        },
        set () {
          this.items = this.$store.state.models
        }
      }
    },
    methods: {
      onSearch: function (query, found) {
        console.log('search', query)
        this.filteredItems(query)
      },
      onClear: function (event) {
        console.log('clear', event)
      },
      onEnable: function (event) {
        console.log('enable')
      },
      onDisable: function (event) {
        console.log('disable')
        this.items = this.$store.state.models
      },
      filteredItems (query) {
        this.items = this.$store.state.models.filter(item => {
          return item.name.toLowerCase().match(query.toLowerCase())
        })
      },
      goToModelTopics (model) {
        return `/posts/?mid=${model.id}&model=${model.name}`
      },
      goToAllTopics () {
        return `/posts/?bid=${this.$route.query.bid}&brand=${this.$route.query.brand}`
      },
    },
    created () {
      this.$store.dispatch('getModels', this.$route.query.bid)
    }
  }
</script>
<style lang="less">
    .model-page {
        .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: solid #eeeeee;
        }
    }
</style>