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
          <!-- 使用v-model 就相当于绑定了一个:value  一个@input -->
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛 选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">根据筛选条件共查询到 {{total}} 条结果：</div>
      <!-- 表格组件 -->
      <el-table :data="articles">
        <!-- prop 指定这一列显示哪个字段的数据 -->
        <!-- label 指定这一列的名称 -->
        <el-table-column prop="img" label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" fit="cover" style="width:120px;height:80px">
              <div slot="error">
                <img src="../../assets/images/error.gif" style="width:120px;height:80px" alt />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column prop="img" label="操作" width="120px">
          <!-- 要做处理，所以要用作用域插槽 -->
          <template slot-scope="scope">
            <el-button plain type="primary" @click="edit(scope.row.id)" icon="el-icon-edit" circle></el-button>
            <el-button plain type="danger" @click="del(scope.row.id)" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div style="text-align:center;margin-top:20px">
        <!-- :total="1000" 指定文章总条数 -->
        <!-- page-size 每页显示几条 -->
        <!-- :current-page="reqParams.page" 数据更新后，当前显示的页码也需要修改 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="changePager"
        ></el-pagination>
      </div>
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
      // axios 提交的数据，值为null是不会携带参数的
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // 频道下拉选项数据
      options: [],
      // 日期数据
      dateArr: [],
      // 文章列表数据
      articles: [],
      // 文章总条数
      total: 0
    }
  },
  // 当组件、函数初始化完毕就会调用created函数
  created () {
    // 获取文章列表数据
    this.getArticles()
  },
  methods: {
    // 编辑文章函数
    edit (id) {
      this.$router.push('/publish?id=' + id)
    },
    // 删除函数
    del (id) {
      // 弹出确认删除框，点击确认后，发删除请求，响应成功后更新列表即可
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 点击确认，向后台发删除请求
          await this.$http.delete(`articles/${id}`)
          this.$message.success('删除文章成功')
          // 更新文章列表
          this.getArticles()
        })
        .catch(() => {})
    },
    // 日期选择后的事件
    changeDate (dateArr) {
      // 把用户清空数据考虑在内
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 筛选函数
    search () {
      // 因为筛选项都是双向绑定，所以拿着数据发请求即可
      this.reqParams.page = 1
      this.getArticles()
    },
    // 改变分页事件函数
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    async getArticles () {
      // axios get传参 {params:指定传参对象} 发请求的时候自动拼接到地址栏后面
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      // 列表数据
      this.articles = data.results
      // 总条数
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
.el-card {
  margin-bottom: 30px;
}
</style>
