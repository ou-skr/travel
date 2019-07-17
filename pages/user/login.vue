<template>
  <div class="container">
    <el-row type="flex" justify="center" align="middle" class="main">
      <div class="form-wrapper">
        <!-- 表单头部tab -->
        <el-row type="flex" justify="space-around" class="tabs">
          <span
            v-for="(v,i) in ['登陆','注册']"
            :key="i"
            @click="handelChange(i)"
            :class="{active:i===currentTab}"
          >{{v}}</span>
        </el-row>
        <LoginForm v-if="currentTab===0"  />
        <Register v-if='currentTab===1' />
      </div>
    </el-row>
  </div>
</template>
<script>
import LoginForm from '@/components/LoginForm.vue'
import Register from '@/components/register.vue'
export default {
    components:{
        LoginForm,
        Register
    },
  data() {
    return {
      currentTab: 0
    };
  },
  methods: {
    handelChange(i) {
      this.currentTab = i;
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  min-width: 1000px; /*最小宽度也是1000px */
  height: 700px;
  background: url(http://157.122.54.189:9095/assets/images/th03.jfif) center 0;
  .main {
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    .form-wrapper {
      width: 400px;
      overflow: hidden;
      border: 1px solid green;
      .tabs {
        span {
          width: 100%;
          height: 48px;
          line-height: 48px;
          text-align: center;
          cursor: pointer;
          border: 1px solid green;
        }
      }
    }
  }
  .active {
    background-color: green;
    color: #fff;
  }
}
</style>
