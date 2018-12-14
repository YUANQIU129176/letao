import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// 引入登录页面
import login from '@/views/Login.vue'
import Index from '@/views/Index.vue'
import user from '@/views/user/user.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'default',
      path: '/',
      redirect: {name: 'login'}
    },
    {
      name: 'login',
      path: '/login',
      component: login
    },
    {
      name: 'index',
      path: '/index',
      component: Index,
      redirect: {name: 'user'},
      children: [
        {
          name: 'user',
          path: 'user',
          component: user
        }
      ]
    }
  ]
})
