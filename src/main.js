// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/styles/index.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {userSubmit} from '@/api'
// import {userSubmit} from '@/api'
Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
// 添加导航守卫
router.beforeEach((to, from, next) => {
  userSubmit().then(res => {
    console.log(res)
    if (res.success === true) {
      next()
    } else {
      next({ name: 'login' })
    }
  })
})
