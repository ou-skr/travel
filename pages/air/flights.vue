<template>
  <div class="main">
    <el-col :span="16">
      <!-- 顶部过滤器 -->
      <FlightsFilters
      :data="cacheFlightsData"
      @changeDataList="changeDataList"
      />
      <!-- 航班头部布局 -->
      <div class="head">
        <FlightsLisHead />
      </div>
      <!-- 航班信息   -->
      <div class="item">
        <FlightsItem v-for="(v,i) in dataList" :key="i" :data="v" class="fi" />
      </div>
      <!-- 分页组件 -->
      <!-- size-change切换条数触发 -->
      <!-- current-change切换页数触发 -->
      <!-- current-page当前页数 -->
      <!-- page-sizes 每一页多少条 -->
      <!-- page-size默认多少条数据  -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="flightsData.total"
      ></el-pagination>
    </el-col>
    <el-col :span="8">
      <!-- 侧边栏 -->
    </el-col>
  </div>
</template>
<script>
import FlightsLisHead from "./flightsListHead";
import FlightsItem from "@/components/flightsItem";
import FlightsFilters from "@/components/flightsFilters";
import { log } from "util";
export default {
  data() {
    return {
      flightsData: {
        flights: [],
        info:{},
        options:{}
      },
      // 这个是一份copy的数据 用来子组件的过滤修改的操作内容
      cacheFlightsData: {
        flights: [],
        info:{},
        options:{}
      },
      // dataList: [],
      currentPage: 1,
      pageSize: 5,
      total: 0
    };
  },
  components: {
    FlightsLisHead,
    FlightsItem,
    FlightsFilters
  },
  methods: {
    // val是选中的条数
    handleSizeChange(val) {
      this.pageSize = val;
      // console.log(this.pageSize);
    },
    // val是选中的条数
    handleCurrentChange(val) {
      this.currentPage = val;
      // console.log(this.currentPage);
    },
    // 把方法传给子组件
    changeDataList(newArrFlight){
      // console.log(123);
      // console.log(newArrFlight);
      this.flightsData.flights=newArrFlight
    }
  },
  mounted() {
    this.$axios({
      url: `airs`,
      params: this.$route.query // 来自URL的5个参数
    }).then(res => {
      console.log(res);
      this.flightsData = res.data;
      this.cacheFlightsData={...res.data}
      // consol.log(this.flightsData)
    });
  },
  computed: {
    // 数组中循环也是
    dataList() {
      return this.flightsData.flights.slice(
        (this.currentPage - 1) * this.pageSize,
        this.pageSize * this.currentPage
      );
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  width: 1000px;
  height: 800px;
  border: 1px solid green;
  margin: 0 auto;
}
.fi {
  margin-top: 15px;
}
</style>
