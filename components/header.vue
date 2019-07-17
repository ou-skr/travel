<template>
  <header>
    <el-row type="flex" justify="space-between" class="main">
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </nuxt-link>
      </div>
      <!-- 将 type 属性赋值为 'flex'，可以启用 flex 布局，并可通过 justify 属性来指定 start, center, end, space-between, space-around 其中的值来定义子元素的排版方式。 -->
      <el-row type="flex" class="nav">
        <!--nuxt 所有目录都要小写 -->
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <el-row type="flex" class="login">
        <el-dropdown>
          <span class="el-dropdown-link">
          <i class="el-icon-bell" data-v-1992e634></i>
            消息
            <i class="el-icon-caret-bottom el-icon--right" data-v-1992e634></i>
          </span>

          <span class="dengluzhuce" v-if="!$store.state.user.userInfo.token">
              <nuxt-link to='/user/login'>登陆/注册</nuxt-link>
          </span>

    

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>消息</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

                <el-row v-if='$store.state.user.userInfo.token'>
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <!-- 头像 -->
                        <img :src="$axios.defaults.baseURL  + $store.state.user.userInfo.user.defaultAvatar" alt="">
                        {{ $store.state.user.userInfo.user.nickname }}    
                        <i class="el-icon-arrow-down el-icon--right"></i>    
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            个人中心
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="handeLogout">
                            退出
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-row>
      </el-row>
    </el-row>
  </header>
</template>
<script>
export default {
  mounted(){
    // 这是一个大仓库，里面有两个小的仓库
    // console.log(this.$store.state,123)
  },
methods:{
  handeLogout(){
    this.$store.commit("user/clearUserInfo");
    this.$message({
      message:'登出成功',
      type:'success'
    })
  }
}
};
</script>
<style lang="less" scoped>
header {
  height: 60px;
  box-shadow: 0 5px 0 #f5f5f5;
  .main {
    width: 1000px;
    height: 60px;
    margin: 0 auto;
  }
  .logo {
    img {
      width: 156px;
      padding-top: 8px;
    }
  }
  .nav {
    flex: 1;
    margin: 0 20px 0 0;
    a {
      font-size: 18px;
      text-decoration: none;
      line-height: 60px;
      padding: 0 20px;
      &:hover {
        background-color: palevioletred;
        color: #fff;
        border-bottom: 5px solid aqua;
      }
    }
  }
  .login {
    line-height: 60px;
    text-decoration: none;
    cursor: pointer;
    .dengluzhuce a{
        text-decoration: none
    }
  }
  .el-dropdown-link{
    img{
        width: 36px;
        height:36px;
        vertical-align: middle;
    }
}
}
</style>


