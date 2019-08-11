// 此文件为事件总线
// 职责：仅仅负责事件绑定和触发

// new Vue()
// 此实例不是在模块内进行事件的绑定和触发，而是统一提供给其他组件的绑定和触发
// 这个文件只要是一个Vue实例即可
import Vue from 'vue'
export default new Vue()
