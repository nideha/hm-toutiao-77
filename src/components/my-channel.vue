<template>
  <!-- v-model="value" 下拉时选择的数据 -->
  <el-select clearable :value="value" @change="fn" placeholder="请选择">
    <!-- :value="item.value" 这个值会返回给v-model -->
    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
// 空字符应该处理为null
// watch: {
//   'reqParams.channel_id': function (newVal, oldVal) {
//     if (newVal === '') {
//       this.reqParams.channel_id = null
//     }
//   }
// },
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      // myValue: null,
      options: []
    }
  },
  created () {
    // 获取频道下拉选项数据
    this.getChannelOptions()
  },
  methods: {
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.options = data.channels
    },
    fn (val) {
      // 空字符应该处理为null
      if (val === '') val = null
      // 数据提交给父组件使用
      this.$emit('input', val)
    }
  }
}
</script>

<style scoped lang='less'>
</style>
