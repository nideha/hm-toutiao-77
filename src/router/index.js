// 定义router对象 导出给main.js
import VueRouter from 'vue-router'
import Vue from 'vue'

import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import NotFound from '@/views/404'
import Image from '@/views/image'
import Publish from '@/views/publish'
import Comment from '@/views/comment'

import store from '@/store'

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
        },
        {
          path: '/image',
          name: 'image',
          component: Image
        },
        {
          path: '/publish',
          name: 'publish',
          component: Publish
        },
        {
          path: '/comment',
          name: 'comment',
          component: Comment
        }
      ]
    },
    // 处理404
    { path: '*', name: '404', component: NotFound }
  ]
})
// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 判断是不是登录路由
  if (to.path === '/login') return next()
  // 判断是否登录
  // store.getUser().token  判断是否有登录信息
  if (!store.getUser().token) return next('/login')
  next()
  // if (to.path !== '/login' && !Storage.getUser().token) return next('/login')
  // next()
})
export default router
