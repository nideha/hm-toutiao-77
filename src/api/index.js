// 配置一个axios并导出
import axios from 'axios'
import store from '@/store'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 给头部加上token
axios.defaults.headers = {
  Authorization: `Bearer ${store.getUser().token}`
}
// 进行导出
export default axios
