// Ponyfill
import 'es6-object-assign/auto'
import 'es6-promise/auto'
// Import Vue
import Vue from 'vue'
import VueResource from 'vue-resource'
// Import F7, F7-Vue
import 'framework7'
import Framework7Vue from 'framework7-vue'
// Import F7 iOS Theme Styles
import 'framework7/dist/css/framework7.ios.min.css'
import 'framework7/dist/css/framework7.ios.colors.min.css'
/* OR for Material Theme:
 import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
 import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'
 */
// Import App Custom Styles
import './assets/styles/framework7-icons.css'
import './assets/fonts/iconfont.css'
import './assets/styles/app.less'
// Import Routes
import Routes from './routes'
// Import App Component
import App from './app'
// Import Vuex store
import store from './store'
// Import language file
import VueI18n from 'vue-i18n'
import StoreCache from './utils/storeCache'
import enUS from './lang/en_us'
import az from './lang/az'
// Carousel framework
import VueCarousel from 'vue-carousel'

// Init Vue Plugin
Vue.use(Framework7Vue)
Vue.use(VueResource)
Vue.use(VueCarousel)

Vue.http.options.root = 'http://localhost:8000'
//Vue.http.options.root = 'http://beedle.caspiansoft.com'
Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
Vue.http.options.emulateJSON = true

Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  request.headers.set('Accept', 'application/json')
  next(function (response) {
    // modify response
    if (response.body.error === true) {
      console.log('main.js -> error occured', response.body.message)
    }
  })
})

let cache = new StoreCache('vuex')
Vue.use(VueI18n)
Vue.config.lang = cache.get('lang') || 'en'
Vue.locale('en', enUS)
Vue.locale('az', az)

const EventBus = new Vue()

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})

// Init App
new Vue({
  el: '#app',
  store,
  template: '<app/>',
  // Init Framework7 by passing parameters here
  framework7: {
    root: '#app',
    modalTitle: Vue.t('app.modal.title'),
    modalButtonOk: Vue.t('app.modal.button_ok'),
    modalButtonCancel: Vue.t('app.cancel'),
    smartSelectOpenIn: 'page',
    /* Uncomment to enable Material theme: */
    // material: true,
    routes: Routes
  },
  // Register App Component
  components: {
    app: App
  }
})