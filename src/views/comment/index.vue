<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <!-- :data="comments" return中的数据 -->
      <el-table :data="comments" style="width: 100%">
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="状态">
          <!-- slot-scope 作用域插槽 -->
          <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="160px">
          <template slot-scope="scope">
            <el-button
              @click="toggleStatus(scope.row)"
              v-if="!scope.row.comment_status"
              size="mini"
              type="success"
            >打开评论</el-button>
            <el-button @click="toggleStatus(scope.row)" v-else size="mini" type="danger">关闭评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top:20px"
        v-if="total > reqParams.per_page"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePage"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        response_type: 'comment',
        page: 1,
        per_page: 20
      },
      comments: [],
      total: 0
    }
  },
  // 组件初始化成功后执行
  created () {
    this.getComments()
  },
  methods: {
    // 获取评论列表数据
    async getComments () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.comments = data.results
      this.total = data.total_count
    },
    // 分页方法设置
    changePage (newPage) {
      this.reqParams.page = newPage
      // 更新列表
      this.getComments()
    },
    // 切换打开关闭评论的方法
    // 异步的方法需要用async
    async toggleStatus (row) {
      const {
        data: { data }
      } = await this.$http.put(`comments/status?article_id=${row.id}`, {
        allow_comment: !row.comment_status
      })
      // 钩子函数提示操作成功
      this.$message.success(
        /* 判断的是修改后的状态 */
        data.allow_comment ? '打开评论成功' : '关闭评论成功'
      )
      // 修改当前行状态就是在更新列表
      row.comment_status = data.allow_comment
    }
  }
}
</script>

<style scoped lang='less'>
</style>
