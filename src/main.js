import Vue from 'vue'
import App from './App.vue'

// 控制台提示信息 开发环境下
Vue.config.productionTip = false

// main.js
// 1.导入项目所需依赖的资源(js包 css文件 其他资源)
// 2.创建一个根实例

// 根实例
new Vue({
  // render是渲染哪个页面
  render: h => h(App)
}).$mount('#app')
