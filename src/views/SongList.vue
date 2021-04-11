<template>
  <ul class="song-list">
    <li v-for="song in data" :key="song.id">
      <router-link
        :to="{
          name: 'Song',
          params: { songId: song.id },
          query: { songName: song.name }
        }"
      >
        <i class="el-icon el-icon-video-play"></i>
      </router-link>
      <div class="song-name">{{ song.name }}</div>
      <div class="singer">{{ song.artists[0]?.name }}</div>
      <div class="album">《{{ song.album.name }}》</div>
      <div class="song-time">{{ getDuration(song.duration) }}</div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SongList',
  props:{
    data: Array
  },
  setup() {
    const getDuration = (value: number): string => {
      return (
        `${Math.floor(value / 60 / 1000)}`.padStart(2, '0') +
        ':' +
        `${Math.floor((value / 100) % 60)}`.padStart(2, '0')
      )
    }
    return {
      getDuration
    }
  }
})
</script>

<style lang="scss">
.song-list {
  text-align: left;
  min-height: 100px;

  li {
    line-height: 28px;
    padding: 6px 10px 6px 15px;
    height: 40px;
    overflow: hidden;
    display: flex;
    cursor: pointer;

    &:nth-of-type(even) {
      background-color: #f7f7f7;
    }

    > * {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 5px;
    }

    i {
      line-height: 28px;
      font-size: 23px;
    }

    .song-name {
      flex: 1;
    }
    .singer {
      width: 100px;
    }
    .album {
      width: 250px;
    }
    .song-time {
      width: 70px;
    }
  }
}
</style>