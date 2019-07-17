<template>
  <div>
    <div>
      <span
      v-for="(item,index) in ['新闻','游戏','娱乐']"
      :key="index"
      @click='handleColor(index)'
      :class="{active:conster===index}"
      >{{item}}
      </span>
    </div>
    <div v-if="conster===0">
      <ul>
        <li>玛莎拉蒂案</li>
        <li>玛莎拉蒂案</li>
        <li>玛莎拉蒂案</li>
      </ul>
    </div>
    <div v-if="conster===1">
      <ul>
        <li>洲际赛韩国夺冠</li>
        <li>洲际赛韩国夺冠</li>
        <li>洲际赛韩国夺冠</li>
      </ul>
    </div>
    <div v-if="conster===2">
      <ul>
        <li>宋仲基离婚</li>
        <li>宋仲基离婚</li>
        <li>宋仲基离婚</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      conster:0
    };
  },
  methods: {
    handleColor(index){
      this.conster=index
    }
  }
};
</script>

<style>
.active{
  color:red
}
</style>
