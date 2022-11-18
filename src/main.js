import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import '@/assets/css/global.css'
// import axios from 'axios'
import  * as  echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false
// App.config.globalProperties.$http = axios
Vue.use(Element, { size: 'small', zIndex: 3000 });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')





