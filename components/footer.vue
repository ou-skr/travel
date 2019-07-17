<template>
  <footer>
    <el-row class="main">
      <el-row class="footer-list">
        <el-col :span="6">
          <div class="grid-content bg-purple lists">
            <h5>闲云旅游旅游网</h5>
            <p>上亿旅行者共同打造的"旅行神器"</p>
            <p>
              <span>60,000</span>多个全球旅游目的地
            </p>
            <p>
              <span>60,000</span> 个细分目的地新玩法
            </p>
            <p>
              <span>760,000,000</span> 次攻略下载
            </p>
            <p>
              <span>38,000</span> 家旅游产品供应商
            </p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple lists">
            <h5>关于我们</h5>
            <p>隐私政策 商标声明</p>
            <p>服务协议 游记协议</p>
            <p>商城平台服务协议</p>
            <p>网络信息侵权通知指引</p>
            <p>闲云旅游旅游网服务监督员</p>
            <p>网站地图加入闲云旅游</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple lists">
            <h5>旅行服务</h5>
            <p>旅游攻略 酒店预订</p>
            <p>旅游特价 国际租车</p>
            <p>旅游问答 旅游保险</p>
            <p>旅游指南 订火车票</p>
            <p>旅游资讯 APP下载</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple lists listss">
            <img src="../images/1562831573.png" alt />
            <p class="guanzhuwomen">关注我们</p>
          </div>
        </el-col>
      </el-row>
        <p class="footest">京ICP备08001421号 京公网安备110108007702 Copyright © 2016-2019 博学谷 All Rights Reserved</p>
    </el-row>
  </footer>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
footer {
  background-color: #333;
  .main {
    width: 1000px;
    margin: 0 auto;
    height: 500px;
  }
  .footer-list {
    .lists {
      font-size: 12px;
      color: #ccc;
      h5 {
        font-size: 16px;
        font-weight: 400;
      }
      img {
        width: 140px;
        width: 140px;
      }
    }
    .listss {
      text-align: center;
    }
  }
  .footest{
    margin-top: 50px;
    padding-top: 50px;
    border-top: 1px dashed #ccc;
    color:#fff;
    text-align:center
  }
}
</style>
