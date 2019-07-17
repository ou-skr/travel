<template>
  <div class="main">
    <div class="guoneijipiao">
      <h2>国内单程机票</h2>
      <el-row class="jipiaoguonei" :gutter="20">
        <el-col :span="8" class="ticketForm">
          <el-row type="flex" class="tabLan">
            <el-col class="dan">
              <nuxt-link to="/">
                <i class="iconfont icondancheng"></i>单程
              </nuxt-link>
            </el-col>
            <el-col class="fan" type="flex">
              <nuxt-link to="/">
                <i class="iconfont iconshuangxiang" data-v-2a96307a></i>返程
              </nuxt-link>
            </el-col>
          </el-row>

          <el-form :model="fjForm" class="fjForm" ref="fjForm" label-width="100px">
            <el-form-item label="出发城市">
              <el-autocomplete
                :fetch-suggestions="queryDepartSearch"
                @select="handleDepartSelect"
                v-model="fjForm.departCity"
                placeholder="请搜索出发地"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item label="到达城市">
              <el-autocomplete
                :fetch-suggestions="queryDestSearch"
                @select="handleDestSelect"
                v-model="fjForm.destCity"
                placeholder="请搜所到达城市"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item label="出发时间">
              <el-date-picker
                type="date"
                @change="handelDate"
                v-model="fjForm.departDate"
                placeholder="请选择你出发的事件"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label>
              <el-button
                style="width:100%;"
                type="primary"
                icon="el-icon-search"
                @click="handleSubmit"
              >搜索</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="16" class="images">
          <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" alt />
        </el-col>
      </el-row>
    </div>
    <div class="tejiajipiao">
      <h2>特价机票</h2>
      <div class="bd">

      <el-row class="tj">
        <el-col  :span="6" v-for="(v,i) in tejiajipiao" :key="i" class="tu">
        <nuxt-link :to="`/air/flights?departCity=${v.departCity}&departCode=${v.departCode}&destCity=${v.destCity}&destCode=${v.destCode}&departDate=${v.departDate}`">

          <el-row class="tj-bj">
            <img
              :src="v.cover"
              alt
            />
            <el-row class="zhe" type="flex" justify="space-around">
              <span>{{v.departCity}}-{{v.destCity}}</span>
              <span>￥{{Number(v.price).toFixed(2)}}</span>
            </el-row>
          </el-row>
      </nuxt-link>

        </el-col>
      </el-row>

      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { log } from "util";
export default {
  data() {
    return {
      tejiajipiao: [],
      fjForm: {
        departCity: "", // 出发城市
        departCode: "", // 出发城市代码
        destCity: "", // 到达城市
        destCode: "", // 到达城市代码
        departDate: "" // 日期字符串
      }
    };
  },
  methods: {
    queryDepartSearch(value, callback) {
      if (!value.trim()) {
        callback([]);
        return;
      }
      this.$axios({
        url: "/airs/city",
        params: {
          // 搜索关键字 输入框的值
          name: value
        }
      }).then(res => {
        // console.log(res);
        const { data } = res.data;

        // 回调函数里面必须是一个数组
        // 回调函数每一项必须是一个对象 对象中必须含有value值
        // 因为返回的对象里面没有value 所以要给一个value
        const newData = data.map(v => {
          return {
            ...v, //结构每一个数据
            value: v.name.replace("市", "") //把市字去掉
          };
        });
        this.fjForm.departCity = newData[0].value;
        this.fjForm.departCode = newData[0].sort;
        callback(newData);
        // console.log(newData)
      });
    },
    queryDestSearch(value, callback) {
      // 回调函数里面必须有数组
      // 回调函数里必须有value值
      // 发送请求获取数据
      // 请求之前判断是否输入内容为空
      if (!value.trim()) {
        callback([]);
        return;
      }
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        // console.log(res);
        // 返回来一个数据对象
        const { data } = res.data;
        // console.log(typeof data); //data是一个对象 数组对象
        // 数据不止是一个 还有很多个 里面是一个数组包着数据
        // 使用map循环返回一个新的对象
        var newData = data.map(v => {
          return {
            ...v, //解构每一项，添加一个value，再返回出去
            value: v.name.replace("市", "") //只是把value赋值并且返回出去，修改了对象
          };
        });
        console.log(typeof newData);
        this.fjForm.destCity = newData[0].value;
        this.fjForm.destCode = newData[0].sort;
        // 返回的数据是没有value值 是一个数组对象
        callback(newData);
      });
    },
    handleDepartSelect(item) {
      this.fjForm.departCity = item.value;
      this.fjForm.departCode = item.sort;
    },
    handleDestSelect(item) {
      this.fjForm.destCity = item.value; // 到达城市
      this.fjForm.destCode = item.sort; // 到达城市代码
    },
    handelDate(value) {
      this.fjForm.departDate = moment(value).format("YYYY-MM-DD");
    },
    handleSubmit() {
      // console.log(this.fjForm);
      const rules = {
        departCity: {
          value: this.fjForm.departCity,
          message: "请选择出发地"
        },
        destCity: {
          value: this.fjForm.destCity,
          message: "请输入到达地"
        },
        departDate: {
          value: this.fjForm.departDate,
          message: "请输入出发日期"
        }
      };

      console.log(Object.keys(rules));
      // 验证结果，如果初始值是true
      let valid = true;
      Object.keys(rules).forEach(v => {
        if (!valid) return;
        if (!rules[v].value) {
          valid = false;
          this.$message.warning(rules[v].message);
        }
      });
      if (!valid) return;
      if (!this.fjForm.destCode) {
        console.log(123);
        this.$router.push({
          path: "/air/flights",
          query: this.fjForm
        });
      }
    },
    // 获取下面的图片
    getAirSale() {
      this.$axios({
        url: "airs/sale"
      }).then(res => {
        console.log(res);
      this.tejiajipiao=res.data.data
        console.log(this.tejiajipiao);
      });
    },
    getAirData(){
      this.$axios({

      })
    }
  },
  mounted() {
    this.getAirSale();
  }
};
</script>
<style lang='less' scoped>
.main {
  width: 1000px;
  border: 1px solid green;
  margin: 0 auto;
}
.guoneijipiao {
  .jipiaoguonei {
    .ticketForm {
      .tabLan {
        width: 100%;
        height: 50px;
        .dan {
          //   display: flex;
          //   align-items: center;
          //   justify-content: center;
          a {
            font-size: 18px;
            text-decoration: none;
            line-height: 50px;
            display: block;
            text-align: center;
            color: #000;
          }
        }
        .fan {
          a {
            font-size: 18px;
            text-decoration: none;
            line-height: 50px;
            display: block;
            text-align: center;
            color: #000;
            background-color: #ccc;
          }
        }
      }
      .fjForm {
        margin-top: 20px;
      }
    }
    .images {
    }
  }
}
.tejiajipiao {
.bd{
  border: 2px solid green;
  padding: 10px;
}
  .tj-bj {
    width: 220px;
    height: 150px;
    overflow: hidden;
    position: relative;
    .zhe {
      width: 100%;
      opacity: 0.7;
      background-color: #000;
      position: absolute;
      bottom: 0;
      left: 0;
      span {
        color: #fff;
      }
    }
  }
}
</style>

