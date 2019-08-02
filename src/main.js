import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 在这引入less文件 可以全局使用
import '@/style/index.less'

import axios from 'axios'
// @是路径别名 代表src文件 在vue-cli创建的项目下才可以使用
// 目录下有默认索引文件  index.js就是默认索引文件 顺序：.js .vue .json
import router from '@/router'
// 挂载到vue原型上让全局使用
Vue.prototype.$http = axios

// 控制台提示信息 开发环境下
Vue.config.productionTip = false

// main.js
// 1.导入项目所需依赖的资源(js包 css文件 其他资源)
// 2.创建一个根实例

Vue.use(ElementUI)
// 根实例
new Vue({
  router,
  // render是渲染哪个页面
  render: h => h(App)
}).$mount('#app')
