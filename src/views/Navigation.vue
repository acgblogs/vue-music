<template>
  <div class="navigation-component">
    <div id="nav">
      <div class="nav-logo">
        <img src="../assets/logo.jpg" alt="logo" />
        <p>网抑云音乐</p>
      </div>
      <ul class="nav-list">
        <router-link 
           v-for="nav in data.navlist" 
           :key="nav"
           to="./">
           {{ nav }}
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { NAV_LIST } from '@/utils/enum'
export default defineComponent({
  setup() {
    const data = reactive({
      navlist: NAV_LIST
    })
    return {
      data
    }
  }
})
</script>

<style lang="scss">
.navigation-component {
  width: 100vw;
  min-width: 960px;
  #nav {
    width: 100%;
    height: 75px;
    display: flex;
    justify-content: center;
    overflow: hidden;
    background: #242424;
    border-bottom: 5px solid #c20c0c;
    color: #ffffff;
    .nav-logo {
      width: 185px;
      height: 100%;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 20px;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      p {
        flex: 1;
        text-align: center;
      }
    }
    .nav-list{
        width: 600px;
        font-size: 14px;
        a:visited,a:hover,a:link{
            text-decoration: none;
            color: #ccc;
        }
        a{
            display: inline-block;
    height: 70px;
    line-height: 70px;
    width: 100px;
    text-align: center;
        }
        a:hover{
            background-color: #000000;
            color: #ffffff;
            font-weight: bold;
        }
    }
  }
}
</style>