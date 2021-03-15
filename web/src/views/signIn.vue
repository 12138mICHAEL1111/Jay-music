<template>
    <div> 
        <el-card header = "注册" class = "login-card">
            <el-form @submit.native.prevent="login" :model="model" ref="signInForm" :rules="rules">
                <el-form-item label="用户名"  prop="username">
                    <el-input v-model="model.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="model.password" type="password" minlength="6" ></el-input>
                </el-form-item>
                 <el-form-item label="请再次输入密码" >
                    <el-input v-model="secondInputPassword" type="password" ></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" native-type= "submit"> 注册并登录 </el-button>
                </el-form-item>         
            </el-form>
           
        </el-card>
    </div>
</template>

<style >
    .login-card{
        width: 25rem;
        margin: 17rem auto
    }
</style>

<script>
export default {
    data(){
        return{
            model:{},
            secondInputPassword:"",
             rules:{   
                username:[
                    {required:true,trigger:'blur'}                   
                ],     
                password:[
                     {required:true,trigger:'blur'}  
                ], 
            },
        }
    },
    methods:{
        async login(){
            this.$refs['signInForm'].validate(async (valid)=>{
                if(valid){                   
                    if(this.model.password!=this.secondInputPassword){
                        this.$message({
                        type: "warning",
                        message: `请输入相同的密码`
                        })
                    }   
                    else{
                        const res = await this.$http.post('signIn',this.model)
                        localStorage.userToken = res.data.userToken
                        localStorage.id = res.data.id
                        this.$router.push('/')
                        this.$message({
                            type: "success",
                            message: `登陆成功, 欢迎${res.data.name}`
                        })
                    }
                }
                else{
                    return false;
                }
            })
        }
    }
}
</script>