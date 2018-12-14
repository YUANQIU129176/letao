<template>
  <div class="login">
    <div class="login-submit">
      <div class="avatar">
          <img src="@/assets/5.jpg" alt="">
      </div>
      <div class="submitLogin">
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
          class="demo-ruleForm"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              placeholder="密码"
            ></el-input>
          </el-form-item>
          <!-- 登录按钮 -->
          <el-form-item>
              <el-button type="primary" class="login-btn" @click="loginSubmit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    loginSubmit () {

    }
  }
}
</script>

<style lang='scss' scoped>
.login {
  background-color: #666;
  width: 100%;
  height: 100%;
  position: relative;
  .login-submit {
    position: absolute;
    background-color: #fff;
    width: 500px;
    height: 350px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .submitLogin {
      margin: 100px auto;
      width: 80%;
    }
  }
  .login-btn{
      width:100%;
  }
  .avatar{
      position: absolute;
      top:-70px;
      left: 50%;
      transform: translate(-50%,0);
      width: 150px;
      height: 150px;
      border-radius: 50%;
      background-color: yellow;
    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        text-shadow: 0 0 1px 1px #ccc;
    }
  }
}
</style>
