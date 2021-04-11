<template>
  <h1>{{data}}</h1>
  <div>5454545</div>
  <p v-for="item in bbb" :key="item">{{item}}</p>
  <div id="player"></div>
</template>

<script lang="ts">
import { ref,reactive,onMounted } from 'vue'
import APlayer from 'aplayer'
import 'aplayer/dist/APlayer.min.css';


export default {
    name: 'Test',

    setup(){
        const data = ref('7777')

        const aaa = ref('sss')
        const bbb = ref(['sss','ssfff','5787'])
        const nextData = reactive({
            aaa,
            bbb
        })
        

        const initPlayer = () =>{
            const ap = new APlayer({
                container: document.getElementById('player'),
                audio: [{
                    name: 'name',
                    artist: '青鸟',
                    url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.mp3',
                    cover: 'cover.jpg'
                }]
            });
            console.log(ap)
        }
  

        onMounted(()=>{
            initPlayer()
        })

        return {
            data,
            ...nextData
        }
    }
    
}
</script>

<style>

</style>