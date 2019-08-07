<template>
  <div class="container">
    <div class="header">header</div>
    <div class="content">
      <!-- 为了区分两个slot，需要添加name属性 -->
      <slot class="content" :msg="msg"></slot>
    </div>
    <div class="footer">
      <slot class="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-test',
  data () {
    return {
      msg: 'my-test的数据'
    }
  }
}
</script>

<style scoped lang='less'>
</style>
