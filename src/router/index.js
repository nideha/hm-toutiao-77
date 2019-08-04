// 定义router对象 导出给main.js
import VueRouter from 'vue-router'
import Vue from 'vue'

import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import NotFound from '@/views/404'

Vue.use(VueRouter)
// 实例化一个router对象
const router = new VueRouter({
  // 路由规则配置
  // name：给当前路由规则取别名
  routes: [
    {
      // 登录规则
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      // 登录规则
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          name: 'welcome',
          component: Welcome
        },
        {
          path: '/article',
          name: 'article',
          component: Article
        }
      ]
    },
    // 处理404
    { path: '*', name: '404', component: NotFound }
  ]
})

export default router
