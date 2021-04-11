<template>
  <ul class="singer-list">
    <li v-for="singer in data" :key="singer.id">
      <img :src="singer.picUrl" :alt="singer.name">
      <p>{{singer.name}}</p>
    </li>
  </ul>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SingerList',
  props:{
    data: Array
  },
  setup(){
    return{
      
    }
  }
})
</script>

<style lang="scss">
.singer-list{
  padding: 20px 0;
  &::after{
    content: '';
    clear: both;
    display: block;
    width: 0;
    height: 0;
  }
  li{
    width: 122px;
    height: 122px;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:nth-of-type(n+8){
      margin-top: 35px;
    }
    img{
      width: 80px;
      height: 80px;
    }
    p{
      margin-top: 5px;
      line-height: 20px;
    }
  }
}
</style>