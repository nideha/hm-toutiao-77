// 定义router对象 导出给main.js
import VueRouter from 'vue-router'
import Vue from 'vue'

import Login from '@/views/login'

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
    }
  ]
})

export default router
