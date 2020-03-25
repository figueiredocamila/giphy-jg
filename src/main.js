import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Axios from 'axios'

Vue.use(Vuetify)

const opts = {}

export default new Vuetify(opts)

Vue.prototype.$http = Axios

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  vuetify: new Vuetify(),
}).$mount('#app')


