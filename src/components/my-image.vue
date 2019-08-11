<template>
  <!-- 封装一个封面素材选择组件 -->
  <div class="my-image">
    <!-- 图片按钮 -->
    <div class="img_btn">
      <!-- 这样写的话，在用vue-cli创建的项目中，不会去打包(解析)背后的资源的 -->
      <img :src="value||defaultImage" alt @click="openDialog" />
    </div>
    <!-- 对话框 -->
    <el-dialog title="选择封面" :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <el-radio-group v-model="reqParams.collect" @change="collectChange" size="mini">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <div class="img-list">
            <!-- :class="{selected:selectedImageUrl===item.url}" 当你选中的地址与你遍历的时候一致时选中，不一致不选中 -->
            <div
              class="img-item"
              :class="{selected:selectedImageUrl===item.url}"
              @click="selectedImage(item.url)"
              v-for="item in images"
              :key="item.id"
            >
              <img :src="item.url" alt />
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
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <!-- 上传组件 -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="handleSuccess"
            :headers="uploadHeaders"
            name="image"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
// 默认图功能
import defaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  // 父传子接收数据
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      activeName: 'image',
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      // 图片列表数据
      images: [],
      total: 0,
      // 记录选中的图片地址
      selectedImageUrl: null,
      // 上传的头部
      uploadHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      // 记录上传的图片地址
      uploadImageUrl: null,
      // 封面图片地址
      // value: defaultImage
      // 因为不是属于当前组件的属性或者方法，所以需要指定
      defaultImage
    }
  },
  methods: {
    // 确认图片
    confirmImage () {
      // 让图片按钮能够显示你选中的或上传的图片地址
      // 需要把选中的图片地址送给父组件
      // 子传父
      if (this.activeName === 'image') {
        // 这里显示选中的图片地址
        // this.value = this.selectedImageUrl
        // this.$emit 向父组件提交数据
        // 事件名字为input   数据是this.selectedImageUrl
        this.$emit('input', this.selectedImageUrl)
      } else {
        // 这里显示上传的图片地址
        // this.value = this.uploadImageUrl
        this.$emit('input', this.uploadImageUrl)
      }
      // 关闭对话框
      this.dialogVisible = false
    },
    // 成功上传图片的函数
    handleSuccess (res) {
      // 预览图片
      this.uploadImageUrl = res.data.url
    },
    // 选中的图片
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    openDialog () {
      this.dialogVisible = true
      // 清空之前的图片地址
      this.uploadImageUrl = null
      this.selectedImageUrl = null
      // 获取素材列表数据
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
        // params 路径传参
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    // 列表切换
    collectChange () {
      // 每次切换时都应该回到第一页去看列表
      this.reqParams.page = 1
      // 获取素材列表数据
      this.getImages()
    },
    changePage (newPage) {
      this.reqParams.page = newPage
      // 更新列表
      this.getImages()
    }
  }
}
</script>

<style scoped lang='less'>
.my-image {
  display: inline-block;
  margin-right: 20px;
}
.img_btn {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.dialog-footer {
  text-align: center;
  display: block;
  width: 100%;
}
.img-list {
  margin-top: 10px;
}
.img-item {
  width: 160px;
  height: 120px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 15px;
  margin-bottom: 10px;
  position: relative;
  // 当有selected的时候才添加这个伪元素
  &.selected {
    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
        no-repeat center / 50px 50px;
    }
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
  }
}
</style>
