<template>
  <div class="container">
    <!-- 筛选条件 -->
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <!-- label后边的值是文字介绍 -->
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <!-- v-model="value" 下拉时选择的数据 -->
          <el-select v-model="reqParams.channel_id" placeholder="请选择">
            <!-- :value="item.value" 这个值会返回给v-model -->
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dataArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛 选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果 -->
    <!-- 具名插槽 -->
    <!-- <my-test> -->
    <!-- slot="content"  指定插槽 -->
    <!-- <div slot="content" slot-scope="scope">content</div> -->
    <!-- <div slot="footer">footer</div> -->
    <!-- </my-test> -->
  </div>
</template>

<script>
export default {
  // components: { MyTest },
  // 提交给后台，需要声明数据
  data () {
    return {
      // 筛选项表单数据 提交给后台数据
      reqParams: {
        status: null,
        channel_id: null
      },
      // 频道下拉选项数据
      options: [],
      // 日期数据
      dataArr: []
    }
  }
}
</script>

<style scoped lang='less'>
</style>
