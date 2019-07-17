<template>
  <el-form :model="zhuceForm" status-icon :rules="rules" ref="zhuceForm" class="demo-zhuceForm">
    <el-form-item prop="username">
      <el-input type="text" v-model="zhuceForm.username" placeholder="输入你的手机号码" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model='zhuceForm.captcha' placeholder="输入你的验证码">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="nickname">
      <el-input type="text" v-model="zhuceForm.nickname" placeholder="输入你的名字" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" placeholder="请输入密码" v-model="zhuceForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item prop="checkPassword">
      <el-input
        type="password"
        placeholder="请确认密码"
        v-model="zhuceForm.checkPassword"
        autocomplete="off"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button @click="handleRegSubmit" type="primary">注册</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import loginFormVue from './loginForm.vue';
export default {
  data() {
    const validatePass =(rule,value,callback)=>{
      if(value===''){
        callback(new Error("请再次输入密码"))
      }else if(value !==this.zhuceForm.password){
        callback(new Error("两次输入密码不正确"))
      }else{
        callback()
      }
    }
    return {
      zhuceForm: {
        // 手机号码
        username: "",
        // 昵称
        nickname: "",
        // 手机验证码
        captcha: "",
        password: "",
        checkPassword:''
      },
        // 表单校验
        rules:{
          username:[{
            required:true,
            message:'输入手机号',
            trigger:'blur'
          }],
          password:[{
             required:true,
            message:'请输入密码',
            trigger:'blur'
          }],
          nickname:[{
            required:true,
            message:'请输入昵称',
            trigger:'blur'
          }],
          captcha:[{
            required:true,
            message:'请输入验证码',
            trigger:'blur'
          }],
          checkPassword:[{
            validator:validatePass,
            trigger:'blur'
          }]
        }
      }
    },
    methods:{
      // 发送验证码
      handleSendCaptcha(){
        // 判断什么情况下验证码不能发送
        if(!this.zhuceForm.username){
          // console.dir(this.$confirm)
          // 这是一个提示弹窗 提示信息  提示标题 对象
          this.$confirm("手机号不能空","提示",{
            // 弹窗有一个按钮
            confirmButtonText:'确定',
            showCancelButton:false,
            type:'warning'
          })
          return;
        }

        if(this.zhuceForm.username.length!==11){
          this.$confirm('手机号码格式错误','提示',{
            confirmButtonText:'确定',
            showCancelButton:false,
            type:"warning"
          })
          return;
        }

        // 发送axios请求获取验证码数据
        // 为什么可以使用axios，因为它已经赋值给原型vue对象上，直接用它的方法就可以了，不用引入axios
        this.$axios({
          url:'captchas',
          method:'POST',
          // 把电话号码作为数据传给服务器
          data:{
            tel:this.zhuceForm.username
          }
        }).then(res=>{
         this.$confirm(`模拟手机验证码:${res.data.code}`,'提示',{
           confirmButtonText:'确定',
           showCancelButton:false,
           type:'warning'
         })
        })
      },
handleRegSubmit(){
  this.$refs.zhuceForm.validate((valid)=>{
    if(valid){
      // 如果表单验证没问题那么就注册提交
      const {checkPassword,...props} =this.zhuceForm;
      // this.$axios({
      //   url:`/accounts/register`,
      //   method:'POST',
      //   data:props
      // }).then(res=>{
      //   console.log(res.data)
      //   this.$message({
      //     message:'注册成功',
      //     type:'success'
      //   })
        // setTimeout(() => {
        //   // 将数据保存在vueX   zhuce/命名空间 是zhece这个文件的setUserInfo
        //   this.$store.commit("zhuce/setUserInfo",res.data)
        //   this.$router.replace("/")
        // }, 1000);

        // this.$store.dispatch
        //  console.log(this.$store)
        console.log(props)
         this.$store.dispatch("user/zhuce",props).then(res=>{
          //  console.log(res)
                    this.$message({
                        message:'成功了,可以登录',
                        type:'success'
                    });
                    console.log(props)
                   // 跳转到首页
                        this.$router.replace("/")  
                        // this.$store.commit("user/setUserInfo",res.data)            
         })
      // })
    }
  })
}
    }
  }

</script>
<style lang="less" scoped>
</style>
