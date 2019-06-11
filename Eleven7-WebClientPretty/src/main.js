import Vue from 'vue'

// Plugins
import './plugins'

import App from './App.vue'
import router from './router'
import store from './store/store'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
