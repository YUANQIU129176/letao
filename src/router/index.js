import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// 引入登录页面
import login from '@/views/Login.vue'
import home from '@/views/Home.vue'
import user from '@/views/user/user.vue'
import category from '@/views/category/OneCategory.vue'

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
      name: 'home',
      path: '/home',
      component: home,
      redirect: {name: 'user'},
      children: [{
        name: 'user',
        path: '/user',
        component: user
      },
      {
        name: 'category',
        path: '/category',
        component: category
      }
      ]
    }
  ]
})
