<template>
<div>
  <el-carousel height="800px" direction="vertical" :autoplay="true">
    <el-carousel-item 
    v-for="(v,i) in banners" 
    :key="i">
           <div class="banner-image" 
           :style="`
         background:url(${$axios.defaults.baseURL+v.url}) center center no-repeat;
         background-size:contain contain;
         `">
          </div>
    </el-carousel-item>
  </el-carousel>

    <!-- 搜索框 -->
    <div class="banner-content">
        <div class="search-bar">
            
            <!-- tab栏 -->
            <el-row 
            type="flex" 
            class="search-tab">
                <span
                v-for="(v,i) in tabs"
                :key="i"
                v-on:click='searchHandelClick(i)'
                :class="{active:i===currentTab}"
                >
                    <i>{{v.name}}</i>
                </span>
            </el-row>
            
            <!-- 输入框 -->
            <el-row 
            type="flex" 
            align="middle" 
            class="search-input">
                <input 
                v-bind:placeholder="tabs[currentTab].placeHolder" />
                <i class="el-icon-search"></i>
            </el-row>
        </div>
    </div>

  </div>
</template>
<script>
import { log } from 'util';
export default {
   data(){
      return{
         banners:[],//存放轮播图的数据
         currentTab:0,
         tabs:[
           {name:'攻略',placeHolder:'搜索城市'},
           {name:'酒店',placeHolder:'搜索酒店'},
           {name:'国内机票',placeHolder:'国内机票'}
         ]
      }
   },
    mounted(){
      // 给这个实例对象绑定了axios 公司常用这个方式
        this.$axios({
            url: "http://157.122.54.189:9095/scenics/banners"
        }).then(res => {
            const {data} = res.data;
            this.banners = data;
            console.log(this.banners)
        })
    },
    methods:{
      searchHandelClick(i){
        this.currentTab=i;
        if(i===2){
          this.$router.push('/air')
        }
      }
    }
};
</script>

<style lang=<style lang="less">
  .banner-image{
    width: 100%;
    height: 100%;
  }

  // 搜索框
      .banner-content{
        z-index:9;
        width:1000px;
        position:absolute;
        left:50%;
        top:45%;
        margin-left: -500px;
        border-top:1px transparent solid;

        .search-bar{
            width:552px;
            margin:0 auto;
        }

        .search-tab{
            .active{
                i{
                color:#333;
                }
                &::after{
                background: #eee;
                }
            }

            span{
                width:82px;
                height:36px;
                display:block;
                position: relative;
                margin-right:8px;
                cursor: pointer;

                i{
                position:absolute;
                z-index:2;
                display: block;
                width:100%;
                height:100%;
                line-height:30px;
                text-align:center;
                color:#fff;
                }

                &:after{
                position: absolute;
                left:0;
                top:0;
                display:block;
                content: "";
                width:100%;
                height:100%;
                border: 1px rgba(255,255,255,.2) solid;
                border-bottom: none;
                transform: scale(1.1,1.3) perspective(.7em) rotateX(2.2deg);
                transform-origin: bottom left;
                background: rgba(0,0,0,.5);
                border-radius:1px 2px 0 0;
                box-sizing:border-box;
                }
            }
        }

        .search-input{
            width:550px;
            height:46px;
            background:#fff;
            border-radius: 0 4px 4px 4px;
            border: 1px rgba(255,255,255,.2) solid;
            border-top:none;
            box-sizing: unset;

            input{
                flex:1;
                height:20px;
                padding: 13px 15px;
                outline: none;
                border:0;
                font-size:16px;
            }

            .el-icon-search{
                cursor :pointer;
                font-size:22px;
                padding:0 10px;
                font-weight:bold;
            }
        }
    }
</style>

