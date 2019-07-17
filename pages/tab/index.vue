<template>
    <div>
        <h1 
        v-for="(v,i) in ['小明','小铭','小名']"
        :key=i
        @click="handelClick(i)"
        :class="{color:current===i}"
        >
        {{v}}</h1>
        <div v-if='this.current===0'>
            <h2>你好1</h2>
            <h2>你好2</h2>
            <h2>你好3</h2>
            <h2>你好4</h2>
        </div>
        <div v-if='this.current===1'>
            <h2>hello1</h2>
            <h2>hello2</h2>
            <h2>hello3</h2>
            <h2>hello4</h2>
        </div>
        <div v-if='this.current===2'>
            <h2>hi1</h2>
            <h2>hi2</h2>
            <h2>hi3</h2>
            <h2>hi4</h2>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            current:0
        }
    },
    methods: {
        handelClick(i){
            this.current=i
        }
    }
}
</script>
<style>
.color{
    color:pink
}
</style>


