// 存储信息的时候：
// 1.约定信息的key是什么
// 2.存储信息的值是什么  字符串格式
const key = 'hm-toutiao-77-user'
export default {
  setUser (user) {
    // 存储用户信息到sessionStorage中
    const localUser = this.getUser()
    // 把你想存入的信息合并覆盖到当前的user对象即可
    // 下面代码  如果两个展开的对象有相同的属性，后边的属性会覆盖前边的属性
    const nowUser = { ...localUser, ...user }
    window.sessionStorage.setItem(key, JSON.stringify(nowUser))
  },
  getUser () {
    // 从sessionStorage中获取用户信息
    return JSON.parse(window.sessionStorage.getItem(key) || '{}')
  },
  clearUser () {
    window.sessionStorage.removeItem(key)
  }
}
