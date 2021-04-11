import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Song from '../views/Song.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/song/:songId',
    name: 'Song',
    props: true,
    component: Song
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
