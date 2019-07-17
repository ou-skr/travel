<template>
  <div class="mian">
    <el-form status-icon :model="useForm" :rules="rules" ref="useForm" class="demo-ruleForm">
      <el-form-item prop="userName">
        <el-input
          type="userName"
          placeholder="用户名/手机"
          v-model="useForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" placeholder="密码" v-model="useForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <p class="form-text">
        <nuxt-link to="#">忘记密码</nuxt-link>
      </p>
      <el-form-item>
        <el-button class="dl" type="primary" @click="handleLoginSubmit">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { log } from "util";
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      useForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleLoginSubmit() {
      // 验证表单
      this.$refs.useForm.validate(valid => {
        // 为true表示没有错误
        if (valid) {
                //    this.$axios({
                //     url: "/accounts/login",
                //     method: "POST",
                //     data: this.useForm
                // }).then(res => {
                //     console.log(res.data);
                // })
                console.log(this.$store)
                this.$store.dispatch("user/login",this.useForm).then(res=>{
                    this.$message({
                        message:'成功了,可以登录',
                        type:'success'
                    });
                    // 跳转到首页
                    setTimeout(()=>{
                        // this.$store.commit("user/setUserInfo",res.data)
                                this.$router.replace("/")
                   },1000)
                })
        }
      })
    }
  }
};
</script>
<style lang="less" scoped>
.demo-ruleForm {
  padding: 25px;
}
.dl {
  width: 100%;
}
.form-text {
  font-size: 12px;
  margin-bottom: 5px;
  text-align: right;
  line-height: 1;
  a {
    color: #fff;
    text-decoration: none;
  }
}
</style>

