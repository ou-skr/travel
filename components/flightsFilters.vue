<template>
  <div class="filters">
    <el-row type="flex" class="fliters-top" align="middle">
      <el-col
        :span="8"
      >单程: {{data.info.departCity}} - {{data.info.destCity}}/{{data.info.departDate}}</el-col>
      <el-col :span="4">
        <el-select size="mini" v-for="(v,i) in data.options.airport" :key="i" placeholder="起飞机场">
          <el-option :value="v"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" placeholder="起飞时间">
          <el-option v-for="(v,i) in data.options.flightTimes" :key="i" :value="`${v.from}:00-${v.to}:00`"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" placeholder="航空公司"
        @change='handelCompany'
        >
          <el-option
          v-for="(v,i) in data.options.company"
          :key="i"
          :value="v"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" placeholder="机型">
          <el-option
          v-for="(v,i) in planeSize"
          :key="i"
           :value="v.type"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="chexiao">
      <span>
        筛选:
        <el-button type="success" size="mini">撤销</el-button>
      </span>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return{
        planeSize:[
         {size:'L',type:'大'},
         {size:'M',type:'中'},
         {size:'S',type:'小'}
        ]
    }
  },
  // 对象的方式声明组件可以接收的属性
  props: {
    data: {
      type: Object, // 声明属性的类型
      default: {} // 属性的默认值
    }
  },
  methods:{
      handelCompany(val){
          console.log(val);
        // 把数据拿过来进行过滤，过滤掉没有选中的航班
       let newArrFlight= this.data.flights.filter(v=>{
            return v.airline_name===val
        })
        console.log(newArrFlight);
        this.$emit("changeDataList",newArrFlight)
      }
  }
}; 
</script>
<style lang="less" scoped>
.fliters-top {
  font-size: 14px;
  > div {
    margin-left: 10px;
  }
}
.chexiao {
  font-size: 14px;
  margin-left: 10px;
  margin-bottom: 10px;
}
</style>
