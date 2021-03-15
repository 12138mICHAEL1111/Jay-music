import axios from 'axios'
import Vue from 'vue'
import router from './router'
const http = axios.create(
    {
        baseURL: process.env.VUE_APP_API_URL || '/admin/api',
        //baseURL: 'http://localhost:3000/admin/api'
    }
)

//弹出错误
http.interceptors.response.use(res => {
    return res
},err=>{
    if(err.response.data.message){
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message}
            )}
            //跳回登录页
    if(err.response.status == 401){
        router.push('/login')
    }

    return Promise.reject(err)
})


//登录返回Authorization给前端
http.interceptors.request.use(function(config){
    if(localStorage.token){
      config.headers.Authorization = 'Bearer ' + (localStorage.token)
    }
    return config;
},function(error){
    return Promise.reject(error)
})

export default http