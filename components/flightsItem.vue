<template>
  <el-row class="flight-item">
    <div @click="handelClickIsTrue">
      <el-row type="flex" align="middle" class="flight-info">
        <el-col :span="6">{{data.airline_name}}-{{data.flight_no}}</el-col>
        <el-col :span="12">
          <el-row type="flex" class="flight-info-center">
            <el-col class="flight-start">
              <strong>{{data.dep_time}}</strong>
              <span>{{data.org_airport_name}}</span>
            </el-col>
            <el-col class="flight-time">
              <span>{{rankTime}}</span>
            </el-col>
            <el-col class="flight-end">
              <strong>{{data.arr_time}}</strong>
              <span>{{data.dst_airport_name}}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">￥810起</el-col>
      </el-row>
    </div>
    <el-row class="tuijian" type="flex" align="middle" v-if="isTrue">
      <el-col :span="5">低价推荐</el-col>
      <el-col :span="19">
        <el-row type="flex" align="middle"
         v-for="(v,i) in data.seat_infos"
          :key="i"
          >
          <el-col :span="18">{{v.name}}|{{v.supplierName}}</el-col>
          <el-col :span="3" class="price">￥{{v.org_settle_price_coupon}}</el-col>
          <el-col :span="3" class="xdBtn">
            <el-button type="warning" size="mini" class="btn">选定</el-button>
            <p>剩余 :{{v.discount}}</p>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-row>
</template>
<script>
import { log } from 'util';
export default {
  data() {
    return {
      isTrue: false
    };
  },
  methods: {
    handelClickIsTrue() {
      this.isTrue = !this.isTrue;
    },
    minPirce(price){
        console.log(price)
    }
  },
  // watch可以监听所有组件的属性 例如This.$route 可以监听他
  watch:{
    $route(){
      // 当里面的query发生变化 就会监听这个方法
      console.log(this.$route)
    }
  },
  /* 本身没有关系 watch本身是和computed是没有关系的，一个是监听一个是获取计算后的值
      comcupted有监听功能，能够监听函数内部引用的所有的实例属性，当属性发生变化的时候或重新返回新的值
      watch能够监听单独的属性 属性发生改变时执行对应的函数
      1.监听多个属性而且有返回值的时候使用computed
      2.监听单个属性的时候使用watch
  */
    computed:{
      // 监听这个rankTime这个函数 这个函数里面实例属性发生变化的时候 自动执行函数并且返回新的值
      rankTime(){
      const start=this.data.arr_time.split(":");
      const end=this.data.dep_time.split(":");
      const s=start[0]*60+ +start[1]
      const e=end[0]*60+ +end[1]
      
      let hours=Math.floor((s-e)/60);
      let min=(s-e)%60
      if(hours<0){
       hours+=24
      }
      if(min<0){
        min+=60
      }
      return `${hours}时${min}分`
      }
  },
  // 对象的方式声明组件可以接收的属性
  props: {
    data: {
      type: Object, // 声明属性的类型
      default: {} // 属性的默认值
    }
  }
};
</script>
<style lang="less" scoped>
.flight-item {
  div {
    border: 1px solid green;
  }
  .flight-info {
    text-align: center;
    .flight-info-center {
      .flight-start {
        display: flex;
        flex-direction: column;
      }
      .flight-time {
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          padding-bottom: 5px;
          border-bottom: 1px solid green;
        }
      }
      .flight-end {
        display: flex;
        flex-direction: column;
      }
    }
  }
  .tuijian {
    margin-top: 10px;
    padding: 10px;
    transition: all 10s linear;
    .price {
      color: orange;
    }
    .xdBtn {
      .btn {
        width: 100%;
      }
      p {
        font-size: 12px;
        text-align: center;
      }
    }
  }
}
</style>
