import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import vConsole from 'vconsole'

Vue.config.productionTip = false
Vue.prototype.$vConsole= new vConsole()
Vue.prototype.$bus= new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
