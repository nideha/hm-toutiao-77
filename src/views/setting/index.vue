<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <!-- 栅格布局系统 -->
      <!-- 行 -->
      <el-row>
        <!-- 列 -->
        <!-- :span 代表占几等份 -->
        <el-col :span="12">
          <!-- 表单 -->
          <el-form label-width="120px">
            <el-form-item label="编号：">{{userForm.id}}</el-form-item>
            <el-form-item label="手机：">{{userForm.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input v-model="userForm.intro" type="textarea" rows="3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveUserInfo">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传头像 -->
          <el-upload
            class="avatar-uploader"
            action
            :show-file-list="false"
            :http-request="myUpload"
          >
            <img v-if="userForm.photo" :src="userForm.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
import eventBus from '@/components/eventBus'
export default {
  data () {
    return {
      userForm: {
        // 后台会默认修改为null
        id: null,
        name: null,
        intro: null,
        email: null,
        mobile: null,
        photo: null
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    // 自定义上传事件,选择图片后会触发
    myUpload (result) {
      // axios + formdata上传
      const formData = new FormData()
      formData.append('photo', result.file)
      this.$http.patch('user/photo', formData).then(res => {
        // 上传头像成功
        this.$message.success('修改头像成功')
        // 预览功能
        this.userForm.photo = res.data.data.photo
        // 同步本地存储
        // 当你刷新页面时，home组件使用的是本地存储的数据，需要更新本地存储
        store.setUser({ photo: this.userForm.photo })
        // 同步home组件
        eventBus.$emit('updatePhoto', this.userForm.photo)
      })
    },
    // 获取用户信息
    async getUserInfo () {
      const {
        data: { data }
      } = await this.$http.get('user/profile')
      // 赋值给userForm
      this.userForm = data
    },
    // 保存用户信息 异步的
    async saveUserInfo () {
      // patch请求类型修改  局部修改
      // put请求类型修改  全部修改
      await this.$http.patch('user/profile', {
        // 按照后台的需要提交数据
        name: this.userForm.name,
        intro: this.userForm.intro,
        email: this.userForm.email
      })
      // 提示
      this.$message.success('保存设置成功')
      // 当你刷新页面时，home组件使用的是本地存储的数据，需要更新本地存储
      store.setUser({ name: this.userForm.name })
      // 更新home组件的用户名
      eventBus.$emit('updateName', this.userForm.name)
    }
  }
}
</script>

<style scoped lang='less'>
</style>
