<template>
  <div>
    <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer">
      <h3 class="loginTitle">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" auto-complate="off" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complate="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="check" class="loginRemember">是否记住密码</el-checkbox>
      <el-button type="primary" style="width: 100%" @click="login">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import {postKeyValueRequest} from "@/utils/api";

export default {
  name: "Login",
  data() {
    return{
      loginForm:{
        username:'',
        password:''
      },
      check:true,
      rules:{
        username:[{required:true,message:'请输入用户名',trigger:'blur'}],
        password:[{required:true,message:'请输入密码',trigger:'blur'}]
      }
    }
  },
  methods:{
    login(){
      this.$refs.loginForm.validate((valid) => {
        if (valid){
          postKeyValueRequest('/doLogin',this.loginForm).then(resp=>{
            alert(resp)
            if (resp){
              window.sessionStorage.setItem("user",JSON.stringify(resp))
              this.$router.replace('/home')
            }
          })
        }else {
          this.$message.error('请填写完整信息');
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.loginContainer{
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #ffffff;
  border: 1px solid #ffffff;
  box-shadow: 0 0 25px #8d9db3;
}
.loginTitle{
  margin: 20px auto 20px auto;
  text-align: center;
  color: black;
}
.loginRemember{
  text-align: left;
  margin: 0px 0px 15px 0px;
}
</style>
