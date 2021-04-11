export const NAV_LIST = [
  "发现音乐",
  "我的音乐",
  "朋友",
  "商城",
  "音乐人",
  "搜索"
]
// 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
export const TAB_LIST = [
  {
    value: 1,
    name:'Song',
    label: '单曲'
  },
  {
    value: 100,
    name:'Singer',
    label: '歌手'
  },
  {
    value: 10,
    name:'Album',
    label: '专辑'
  },{
    value: 1014,
    name:'Video',
    label: '视频'
  },{
    value:1006,
    name:'Lyrics',
    label: '歌词'
  },{
    value: 1000,
    name:'Songs',
    label: '歌单'
  },{
    value: 1009,
    name:'Broadcast',
    label: '电台'
  }
  ,{
    value: 1018,
    name:'Synthesis',
    label: '综合'
  },
]

export const SONG_DATA = {
  Song: 'songList',
  Singer: 'artists'
}