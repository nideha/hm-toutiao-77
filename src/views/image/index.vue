<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div class="btn-box">
        <el-radio-group v-model="reqParams.collect" @change="changeCollect" size="small">
          <!-- :label 没有动态绑定的话，只会执行开始的一次 -->
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" size="small" @click="openDialog()" style="float:right">添加素材</el-button>
        <div class="img_list">
          <div class="img_item" v-for="item in images" :key="item.id">
            <img :src="item.url" alt />
            <div class="foot" v-show="!reqParams.collect">
              <!-- 收藏按钮 -->
              <span
                @click="toggleCollect(item)"
                class="el-icon-star-off"
                :class="{selected:item.is_collected}"
              ></span>
              <!-- 删除按钮 -->
              <span @click="deleteImage(item.id)" class="el-icon-delete"></span>
            </div>
          </div>
        </div>
      </div>
      <!-- v-if="total > reqParams.per_page"  页码只有；两个以上时才会显示 -->
      <el-pagination
        v-if="total > reqParams.per_page"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePage"
      ></el-pagination>
    </el-card>
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="handleSuccess"
        :headers="uploadHeaders"
        name="image"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      // 给后台提交的参数
      reqParams: {
        // collecd 全部  默认值为false
        collect: false,
        page: 1,
        per_page: 10
      },
      // 图片列表数据
      images: [],
      // 总条数
      total: 0,
      // 控制对话框显示与隐藏
      dialogVisible: false,
      // 上传成功后的图片地址 预览图数据
      imageUrl: null,
      // 上传组件的头部信息
      uploadHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      }
    }
  },
  created () {
    // 获取素材列表
    this.getImages()
  },
  methods: {
    // 删除图片的方法
    deleteImage (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 发删除请求不需要拿任何返回值，成功后直接更新列表即可
          await this.$http.delete(`user/images/${id}`)
          // 提示
          this.$message.success('删除成功')
          // 更新列表
          this.getImages()
        })
        .catch(() => {})
    },
    // 添加收藏、取消收藏函数
    // 向后台发送请求是异步的，所以需要用async await
    async toggleCollect (item) {
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      // 提示
      // 需要判断修改后的图片状态 data.collect
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
      // 更新当前组件的状态，显示收藏图标的颜色改变
      item.is_collected = data.collect
    },
    // 上传成功
    handleSuccess (res) {
      // 获取图片地址，显示在img标签上
      this.imageUrl = res.data.url
      // 提示上传成功
      this.$message.success('上传成功')
      // 2s后关闭对话框，更新列表
      window.setTimeout(() => {
        // 关闭对话框
        this.dialogVisible = false
        // 跳转到第一页
        this.reqParams.page = 1
        // 更新列表
        this.getImages()
      }, 2000)
    },
    // 打开对话框
    openDialog () {
      // 打开前清空预览图片
      this.imageUrl = null
      this.dialogVisible = true
    },
    // 全部与收藏按钮切换事件
    changeCollect () {
      this.reqParams.page = 1
      // 更新列表
      this.getImages()
    },
    changePage (newPage) {
      this.reqParams.page = newPage
      // 更新列表
      this.getImages()
    },
    // 更新列表的函数
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
.img_list {
  margin-top: 20px;
  .img_item {
    width: 160px;
    height: 160px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin: 0 40px 30px 40px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .foot {
      position: absolute;
      width: 100%;
      height: 30px;
      line-height: 30px;
      left: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      text-align: center;
      span {
        margin: 0 20px;
        &.selected {
          color: red;
        }
      }
    }
  }
}
</style>
