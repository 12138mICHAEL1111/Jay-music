import axios from 'axios'
import Vue from 'vue'
import router from './router'
const http = axios.create(
    {
        baseURL: 'http://localhost:3000/web/api'
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


Vue.config.warnHandler = function (msg) {  
    if (!msg.includes('Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders.')) {
      return console.warn && console.warn(msg)  
    }  
  }

export default http