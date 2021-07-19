import Vue from 'vue'
import App from './App.vue'
import store from './store'
import fastclick from 'fastclick'
import './assets/css/base.scss'
import VueLazyload from 'vue-lazyload'
import router from './router'
import Loading from './plugin/loading/index'
// 注意点: 如果想通过use的方式来注册组件, 那么必须先将组件封装成插件

Vue.use(VueLazyload, {
  loading: require('./assets/images/loading.png')
})

fastclick.attach(document.body)
Vue.config.productionTip = false

Vue.use(Loading, {
  title: '正在加载...'
})

new Vue({
  router,
  store,
  render: h => h(App),
  mounted: () => document.dispatchEvent(new Event("x-app-rendered")),
}).$mount('#app')
