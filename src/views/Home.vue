<template>
  <div class="home-component">
    <navigation />
    <div class="home-content">
      <el-input
        v-model="searchKey"
        placeholder="输入关键词搜索"
        @keyup.enter="search"
      >
        <template #append>
          <el-button icon="el-icon-search"></el-button>
        </template>
      </el-input>
      <el-tabs
        class="result-container"
        v-model="tabName"
        type="border-card"
        @tab-click="switchTab"
        
      >
        <el-tab-pane
          v-for="tab in data.tabList"
          :key="tab.value"
          :label="tab.label"
          :name="tab.name"
          v-loading="searching"
        >
          <!-- <ul class="result-list">
            <li v-for="song in data.songList" :key="song.id">
              <router-link :to="{ name: 'Song', params: { songId: song.id }, query: { songName: song.name } }">
                <i class="el-icon el-icon-video-play"></i>
              </router-link>
              <div class="song-name">{{ song.name }}</div>
              <div class="singer">{{ song.artists[0]?.name }}</div>
              <div class="album">《{{ song.album.name }}》</div>
              <div class="song-time">{{ getDuration(song.duration) }}</div>
            </li>
          </ul> -->

          <component :is="`${tab.name}List`" :data="data[dataEnum[tab.name]]" />
        </el-tab-pane>
      </el-tabs>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="data.songCount"
        v-model:current-page="currentPage"
        :page-size="pageSize"
        hide-on-single-page
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from 'vue'
import { TAB_LIST, SONG_DATA } from '@/utils/enum'
import { Result, Song, TabData } from '@/components/interface'
import Navigation from './Navigation.vue'
import SongList from './SongList.vue'
import SingerList from './SingerList.vue'

import axios from 'axios'
import Message from 'element-plus/lib/el-message'

export default defineComponent({
  name: 'Home',
  components: {
    Navigation,
    SongList,
    SingerList
  },
  setup() {
    const searchKey = ref('')
    const searchType = ref(1)
    const tabName = ref('Song')
    const lastTabName = ref('Song')
    const searching = ref(false)
    const currentPage = ref(1)
    const pageSize = ref(20)
    const dataEnum = ref(SONG_DATA)
    const data = reactive({
      tabList: TAB_LIST,
      songList: [],
      artists: [],
      songCount: 0
    })
    const search = () => {
      if (!searchKey.value||!currentPage.value) {
        return
      }
      searching.value = true
      const params = {
        keywords: searchKey.value,
        type: searchType.value,
        offset: (currentPage.value - 1) * pageSize.value,
        limit: pageSize.value
      }
      axios
        .get<Result>(`/api/search`, { params })
        .then((res) => {
          searching.value = false
          if (res.data.code === 200) {
            switch (tabName.value) {
              case 'Singer':
                ;(data.artists as Song[]) = res.data.result.artists as Song[]
                break
              default:
                ;(data.songList as Song[]) = res.data.result.songs as Song[]
            }
            data.songCount = res.data.result.songCount
          } else if (res.data.code === 400) {
            Message.error(res.data.msg)
          }
        })
        .catch((err) => {
          searching.value = false
          Message.error(err.msg || err)
        })
    }

    const switchTab = (tabData: TabData) => {
      if (lastTabName.value !== tabData.paneName) {
        searchType.value = data.tabList[tabData.index].value
        currentPage.value = 1
        search()
      }
      lastTabName.value = tabData.paneName
    }

    watch(currentPage, (newIndex) => {
      newIndex && search()
    })

    return {
      data,
      tabName,
      search,
      searchKey,
      switchTab,
      searching,
      currentPage,
      pageSize,
      dataEnum
    }
  }
})
</script>

<style lang="scss">
.home-component {
  width: 100vw;
  min-width: 960px;
  height: 100%;
  overflow: auto;

  .home-content {
    width: 960px;
    min-height: calc(100vh - 75px);
    margin: 0 auto;
    padding: 30px;
    text-align: center;
    background-color: #fff;
    border-left: 1px solid;
    border-right: 1px solid;
    border-color: #ccc;

    .el-input {
      width: 400px;
    }

    .el-tabs__item {
      font-size: 16px;
    }

    .result-container {
      margin-top: 30px;
      min-height: 300px;
    }

    .result-list {
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
    .el-pagination {
      margin-top: 15px;
    }
  }
}
</style>