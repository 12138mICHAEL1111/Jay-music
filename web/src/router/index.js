import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/login.vue'
import myMusic from '../views/myMusic.vue'
import signIn from '../views/signIn.vue'
import myProfile from '../views/myProfile.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    meta:{isPublic:true,keepAlive:true}
  },
  {
    path:'/login',
    name:'Login',
    component: Login,
    meta:{isPublic:true}
  },
  {
    path:'/my-music/:id',
    name:'my-music',
    component: myMusic,
    meta:{isPublic:false,keepAlive:true}
  },
  {
    path:'/sign-in',
    name:'sign-in',
    component: signIn,
    meta:{isPublic:true}
  },
  {
    path:'/my-profile/edit/:id',
    name:'myProfile',
    props: true,
    component: myProfile,
  }
]

const router = new VueRouter({
  routes
})


router.beforeEach((to,from,next)=>{
  if(!to.meta.isPublic && !localStorage.userToken){
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
