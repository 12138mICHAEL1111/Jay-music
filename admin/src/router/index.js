import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import New from '../views/New.vue'
import Edit from '../views/Edit.vue'
import AdminNew from '../views/CreateAdmin.vue'
import Login from '../views/Login.vue'
import Test from '../views/test.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    
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
    component:Login,
    meta:{isPublic:true}
  },
  {
    path:'/test',
    name:'test',
    component: Test
  }
]

const router = new VueRouter({
  routes
})

//未登录不能访问
router.beforeEach((to,from,next)=>{
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
  next()
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
	if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
	return originalPush.call(this, location).catch(err => err)
}

export default router
