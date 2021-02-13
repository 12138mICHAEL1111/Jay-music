import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import New from '../views/New.vue'
import Edit from '../views/Edit.vue'
import AdminNew from '../views/CreateAdmin.vue'
import Login from '../views/Login.vue'

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
  },
  {
    path: '/musics/edit/:id',
    name: 'edit',
    props: true,
    component: Edit
  },
  {
    path: '/admin/new',
    name: 'admin',
    component: AdminNew
  },
  {
    path: '/login',
    name: 'login',
    component:Login
  }
]

const router = new VueRouter({
  routes
})

export default router
