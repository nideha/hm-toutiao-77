// 配置一个axios并导出
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import JSONBig from 'json-bigint'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.transformResponse = [
  data => {
    // data是后端的原始数据
    // 每次自动会执行
    try {
      return JSONBig.parse(data)
    } catch (e) {
      return data
    }
  }
]
// 只会执行一次，如果有token就会保存，没有就不会保存了，需要刷新
// 给头部加上token
// axios.defaults.headers = {
//   Authorization: `Bearer ${store.getUser().token}`
// }
// 在每次请求之前获取token,追加在headers中
// 请求拦截器:在每次请求前，都会做一些事情
axios.interceptors.request.use(
  config => {
    // 请求拦截成功，修改config   动态的
    config.headers = { Authorization: `Bearer ${store.getUser().token}` }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 响应拦截器:在每次响应后，都会做一些事情
// 拦截token可能失效的情况
axios.interceptors.response.use(
  res => {
    // 请求拦截成功，修改config   动态的
    return res
  },
  err => {
    // 失败的时候需要跳转到登录页
    // 获取响应状态码
    if (err.response.status === 401) {
      // 跳到登录页
      // location.hash = '#/login'
      router.push('/login')
    }
    return Promise.reject(err)
  }
)
// 进行导出
export default axios
