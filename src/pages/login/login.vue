<template>
  <div class="login_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <div class="manage_tip">
          <p>角色切换</p>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="账号" @keyup.13.native="usernameKeyDown($event)"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="loginForm.password" ref="pwd" @keyup.13.native="pwdKeyDown($event)"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()" class="submit_btn">切换</el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script type='text/babel'>
  import {login} from '@/api/user';
  export default {
    name: 'login',
    data () {
      return {
        loginForm: {
          // username: 'PNfeather',
          // password: 'abcdef'
          username: 'visitor',
          password: '123456'
        },
        rules: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        showLogin: false
      };
    },
    mounted () {
      this.showLogin = true;
      !this.$route.query.secretTunnel && this.submitForm();
    },
    methods: {
      usernameKeyDown () {
        this.$refs.pwd.$el.firstElementChild.focus();
      },
      pwdKeyDown () {
        this.submitForm();
      },
      submitForm () {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            login({username: this.loginForm.username, password: this.loginForm.password}).then((res) => {
              let data = res.data;
              if (data.code == '0') {
                this.$message({
                  type: 'success',
                  message: '欢迎光临'
                });
                this.$store.dispatch('changeUserLevel', data.data.level);
                if (this.$route.query.autoBack) {
                  this.$router.go(-1);
                } else {
                  this.$router.push('home');
                }
              } else {
                this.$message({
                  type: 'error',
                  message: data.msg
                });
              }
            });
          } else {
            this.$notify.error({
              title: '错误',
              message: '请输入正确的用户名密码',
              offset: 100
            });
            return false;
          }
        });
      }
    }
  };
</script>
<style scoped lang="less">
  @import '~@/style/mixin';
  .login_page{
    background: url("~@IMG/china-background1.png") center no-repeat;
    background-size: cover;
    background-color: #18221f;
  }
  .manage_tip{
    position: absolute;
    width: 100%;
    top: -100px;
    left: 0;
    p{
      font-size: 34px;
      color: #000;
    }
  }
  .form_contianer{
    .wh(370px, 220px);
    .ctp(370px, 220px);
    box-sizing: border-box;
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    background-color: #fff;
    .submit_btn{
      width: 100%;
      font-size: 16px;
    }
  }
  .tip{
    font-size: 12px;
    color: red;
  }
  .form-fade-enter-active, .form-fade-leave-active {
    transition: all 1s;
  }
  .form-fade-enter, .form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }
</style>
