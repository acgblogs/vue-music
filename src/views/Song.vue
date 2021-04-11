<template>
  <navigation />
  <div class="song-info">
    <h1>
      <a :href="url"> {{ songName }} - {{ artist }}</a>
    </h1>
    <div v-html="lyrics"></div>
  </div>
  <div id="player"></div>
</template>

<script>
import {
  computed,
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  onBeforeUnmount
} from 'vue'
import { useRoute } from 'vue-router'
import Navigation from '@/views/Navigation.vue'
import APlayer from 'aplayer'
import 'aplayer/dist/APlayer.min.css'
import axios from 'axios'
import Message from 'element-plus/lib/el-message'

export default defineComponent({
  name: 'Song',
  components: { Navigation },
  props: {
    songId: String
  },
  setup(props) {
    // 使用路由
    const route = useRoute()

    // 直接返回代表只使用getter
    const sid = computed(() => {
      return +props.songId
    })

    const songName = computed(() => {
      return route.query.songName
    })

    const songDetail = reactive({
      name: songName,
      url: '',
      lyric: '',
      artist: '',
      cover: '',
      player: null
    })

    const lyrics = computed(() => {
      return songDetail.lyric.replace(/\s/g, '</br>')
    })

    const data = toRefs(songDetail)

    const initPlayer = () => {
      songDetail.player = new APlayer({
        container: document.getElementById('player'),
        fixed: true,
        audio: [songDetail]
      })
    }

    const getSongDetail = () => {
      // axios
      //       .get(response.url)
      //       .then(res => {
      //         console.log(res.headers)
      //         if (res.data.code === 200) {
      //           console.log(res.data)
      //         } else if (res.data.code === 400) {
      //           Message.error(res.data.msg)
      //         }
      //       })
      //       .catch((err) => Message.error(err))
      fetch(`/music/song/media/outer/url?id=${sid.value}.mp3`)
        .then((response) => {
          songDetail.url = response.url
          initPlayer()
        })
        .catch((err) => Message.error(err))
    }

    // const getSongLyric = () => {
    //   const params = { id: sid.value }
    //   axios
    //     .get('/api/lyric', { params })
    //     .then((res) => {
    //       if (res.data.code === 200) {
    //         console.log(res.data)
    //       } else if (res.data.code === 400) {
    //         Message.error(res.data.msg)
    //       }
    //     })
    //     .catch((err) => Message.error(err))
    // }

    const getSongLyric = () => {
      const params = {
        keywords: songName.value,
        id: sid.value,
        type: 1006
      }
      axios
        .get('/api/search', { params })
        .then((res) => {
          if (res.data.code === 200) {
            songDetail.lyric = res.data.result.songs[0].lyrics.txt
            songDetail.artist = res.data.result.songs[0].artists[0].name
            songDetail.cover = res.data.result.songs[0].artists[0].img1v1Url
          } else if (res.data.code === 400) {
            Message.error(res.data.msg)
          }
        })
        .catch((err) => Message.error(err))
    }

    onMounted(() => {
      getSongDetail()
      getSongLyric()
    })

    onBeforeUnmount(() => {
      songDetail.player && songDetail.player.destroy()
    })

    return {
      sid,
      songName,
      ...data,
      getSongDetail,
      getSongLyric,
      lyrics
    }
  }
})
</script>

<style lang="scss">
.aplayer.aplayer-fixed .aplayer-body {
  width: 100%;
  max-width: unset;
}
.song-info {
  text-align: center;
  padding-bottom: 70px;
}
</style>