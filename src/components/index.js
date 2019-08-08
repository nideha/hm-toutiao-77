// 封装一个注册所有components下的组件为全局组件的插件
import MyBread from '@/components/my-bread'
import MyTest from '@/components/my-test'
import MyChannel from '@/components/my-channel'

export default {
  // 安装函数  当Vue.use(使用插件时，install将会被调用)
  // Vue 代表全局的Vue对象
  install (Vue) {
    // Vue.component('','') 前面是组件名称，后面的是组件配置对象
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyTest.name, MyTest)
    Vue.component(MyChannel.name, MyChannel)
  }
}
