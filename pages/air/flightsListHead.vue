<template>
  <!-- 航空信息head -->
  <el-row class="header">
    <el-col :span="5">航空信息</el-col>
    <el-col :span="14">
      <el-row>
        <el-col :span="12">起飞时间</el-col>
        <el-col :span="12">到达时间</el-col>
      </el-row>
    </el-col>
    <el-col :span="5">价格</el-col>
  </el-row>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.header {
  background-color: #f6f6f6;
  border: 1px solid #ddd;
  div{
      text-align: center;
  }
}
</style>

