<template>
  <div class="container">
    <el-card class="my-card">
      <img src="../../assets/images/logo_index.png" alt />
      <!-- 表单 -->
      <!-- 表单验证需要通过rules传入验证规则，并在form-item中设置prop属性，并将其值设为需要校验的字段名 -->
      <!-- status-icon 字体图标提示 -->
      <!-- 给form表单加上ref属性，进行整体校验 -->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" status-icon>
        <!-- 表单项 -->
        <el-form-item prop="mobile">
          <!-- 表单元素 -->
          <!-- 因为要提交给后台，需要用v-model双向绑定 -->
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code" status-icon>
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:230px;margin-right:17px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login()">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 引入store模块
import store from '@/store'
export default {
  // 这的数据是model绑定的
  data () {
    // 声明自定义校验函数
    const checkMobile = (rule, value, callback) => {
      // 校验手机号校验规则
      if (!/^1[3-9]\d{9}$/.test(value)) {
        // 如果校验失败则return结束下边代码的执行
        return callback(new Error('手机号格式不对'))
      }
      callback()
    }
    return {
      // 表单对象数据
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      // 表单校验规则数据
      loginRules: {
        mobile: [
          {
            // 输入框为空时会报错
            required: true,
            /* 错误提示信息 */
            message: '请输入手机号',
            // 何时校验：失去焦点的时候
            trigger: 'blur'
          },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          {
            // 输入框为空时会报错
            required: true,
            /* 错误提示信息 */
            message: '请输入验证码',
            // 何时校验：失去焦点的时候
            trigger: 'blur'
          },
          {
            len: 6,
            message: '验证码长度为6位',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    login () {
      // 对整个表单进行校验
      // this.$refs 会找到当前文件下所有标识ref属性的元素
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 请求登录接口
          // 请求体传参需要使用对象的形式
          this.$http
            .post(
              'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
              this.loginForm
            )
            .then(res => {
              // res 响应对象  成功
              // console.log(res.data)
              // 存储用户信息
              store.setUser(res.data.data)
              // 跳转去首页
              this.$router.push('/')
            })
            .catch(() => {
              // 错误提示
              this.$message.error('手机号或验证码错误')
            })
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
// scoped：作用范围
// 写在这表示style样式仅仅在当前组件下生效
// 如果要修改非当前组件标签下的样式，需要去全局样式修改
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  // 背景图定位 / 背景图尺寸
  // contain 等比缩放完整在容器内显示  cover  等比缩放完全铺面容器
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
}
.my-card {
  width: 400px;
  height: 350px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -60%);
  img {
    display: block;
    width: 200px;
    margin: 0 auto 30px;
  }
}
</style>
