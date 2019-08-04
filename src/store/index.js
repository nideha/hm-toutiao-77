// 存储信息的时候：
// 1.约定信息的key是什么
// 2.存储信息的值是什么  字符串格式
const key = 'hm-toutiao-77-user'
export default {
  setUser (user) {
    // 存储用户信息到sessionStorage中
    window.sessionStorage.setItem(key, JSON.stringify(user))
  },
  getUser () {
    // 从sessionStorage中获取用户信息
    return JSON.parse(window.sessionStorage.getItem(key) || '{}')
  }
}
