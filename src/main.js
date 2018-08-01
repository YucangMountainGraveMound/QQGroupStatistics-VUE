import Vue from 'vue'
import App from '@/App'

// vuex
import store from '@/store'

// vue router
import VueRouter from 'vue-router'
import routes from '@/router/router'
import makeRouter from '@/router/routerConfig'
import {sync} from 'vuex-router-sync'

Vue.use(VueRouter)
const router = makeRouter(routes)
sync(store, router)

// iview
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(iView)

// axios
import axios from '@/utils/request'

// viser
Vue.prototype.$http = axios

import ViserVue from 'viser-vue';

Vue.use(ViserVue);

// worker
import VueWorker from 'vue-worker'

Vue.use(VueWorker)

// spinner
import EpicSpinner from '@/components/common/EpicSpinner'

Vue.component('epicSpinner', EpicSpinner)


new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
