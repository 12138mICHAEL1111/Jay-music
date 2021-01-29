import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import New from '../views/New.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main
  },
  {
    path: '/musics/new',
    name: 'new',
    component: New
  }
]

const router = new VueRouter({
  routes
})

export default router
