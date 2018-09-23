import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import wysiwyg from 'vue-wysiwyg'

Vue.config.productionTip = false
global.api = 'https://server-mtb.wahyudisetiaji.xyz'
// global.api = 'http://localhost:3000'
Vue.use(wysiwyg, {
  hideModules: { bold: true },
  forcePlainTextOnPaste: true,
  maxHeight: '500px'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
