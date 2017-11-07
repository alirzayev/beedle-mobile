<template>
    <!-- App -->
    <div id="app">
        <!-- Statusbar -->
        <f7-statusbar></f7-statusbar>

        <!-- Main Views -->
        <f7-views>
            <f7-view id="main-view" navbar-through :dynamic-navbar="true" main>
                <f7-navbar theme="white">
                    <f7-nav-left>
                        <f7-link href="/chats/">
                            <f7-icon v-show="isLoggedIn" style="color: #1c1d1f" f7="chats_fill" size="20px"></f7-icon>
                        </f7-link>
                    </f7-nav-left>
                    <f7-nav-center sliding>{{navbarTitle}}</f7-nav-center>
                    <f7-nav-right v-if="navbarTitle == 'Profile'">
                        <f7-link href="/settings/">
                            <f7-icon v-show="isLoggedIn" style="color: #1c1d1f" f7="settings" size="22px"></f7-icon>
                        </f7-link>
                    </f7-nav-right>
                    <f7-nav-right v-else>
                        <f7-link open-popup="#publisherPopup"
                                 v-show="activedTab === 'home'">
                            <f7-icon style="color: #1c1d1f" f7="add" size="22px"></f7-icon>
                        </f7-link>
                    </f7-nav-right>
                </f7-navbar>
                <f7-pages>
                    <f7-page>
                        <f7-toolbar tabbar scrollable>
                            <f7-link tab-link="#home" active>
                                <f7-icon f7="home_fill"></f7-icon>
                            </f7-link>
                            <f7-link tab-link="#explore">
                                <f7-icon f7="world_fill"></f7-icon>
                            </f7-link>
                            <f7-link tab-link="#search">
                                <f7-icon f7="search_strong"></f7-icon>
                            </f7-link>
                            <f7-link tab-link="#notification">
                                <f7-icon f7="bolt_fill"></f7-icon>
                            </f7-link>
                            <f7-link tab-link="#profile">
                                <f7-icon f7="person_fill"></f7-icon>
                            </f7-link>
                        </f7-toolbar>
                        <f7-tabs>
                            <f7-tab id="home" active @tab:show="tabActived('home')">
                                <home-view></home-view>
                            </f7-tab>
                            <f7-tab id="explore" @tab:show="tabActived('explore')">
                                <explore></explore>
                            </f7-tab>
                            <f7-tab id="notification" @tab:show="tabActived('notification')">
                                <notification-view></notification-view>
                            </f7-tab>
                            <f7-tab id="search" @tab:show="tabActived('search')">
                                <search-view></search-view>
                            </f7-tab>
                            <f7-tab id="profile" @tab:show="tabActived('profile')">
                                <profile-view></profile-view>
                            </f7-tab>
                        </f7-tabs>
                    </f7-page>
                </f7-pages>
            </f7-view>
        </f7-views>

        <!-- Comment, publisher, Notification Popup -->
        <comment-popup></comment-popup>
        <publisher-popup></publisher-popup>
    </div>
</template>

<script>

  /* eslint-disable indent,no-undef */
  import HomeView from './pages/home.vue'
  import ContactsView from './pages/contacts.vue'
  import ProfileView from './pages/profile.vue'
  import CommentPopup from './pages/comment.vue'
  import PublisherPopup from './pages/publisher.vue'
  import NotificationView from './pages/notifications.vue'
  import Explore from './pages/explore.vue'
  import SearchView from './pages/search.vue'

  export default {
    data () {
      return {
        activedTab: 'home'
      }
    },
    computed: {
      isLoggedIn () {
        return this.$store.getters.isLoggedIn
      },
      userCar () {
        return this.$store.getters.user.car
      },
      navbarTitle () {
        switch (this.activedTab) {
          case 'home':
            if (this.isLoggedIn) {
              return this.userCar.model.name
            } else {
              return this.$t('app.app_name')
            }
          case 'explore':
            return this.$t('app.explore')
          case 'profile':
            return this.$t('app.profile')
          case 'notification':
            return this.$t('app.notification')
          case 'search':
            return this.$t('app.search')
        }
      }
    },
    methods: {
      tabActived (tab) {
        this.activedTab = tab
      }
    },
    components: {
      HomeView,
      ContactsView,
      ProfileView,
      CommentPopup,
      PublisherPopup,
      NotificationView,
      Explore,
      SearchView
    },
    created () {
    }
  }
</script>
<style lang="less">
    .tab_menu {
        margin: 0px;
    }
</style>
