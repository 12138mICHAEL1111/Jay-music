<template>
    <div class="about">
        <h1 style="margin-left:20px"> 添加管理员</h1>
        <el-form :model=this.model @submit.native.prevent="save" ref="adminForm" :rules="rules">
            <div class="inputForm" style="margin-left:20px">
                <el-form-item label="用户名" style="width:500px" prop="username">
                    <el-input v-model="model.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" style="width:500px" prop="password"> 
                    <el-input v-model="model.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" native-type="submit" >提交表单</el-button>
                </el-form-item>
                <el-button type='warning' @click='back' >返回</el-button>
            </div>
        </el-form>   
    </div>
</template>

<script>
export default {
    data(){
        return{
            model:{},
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
        back(){
            this.$router.go(-1)
        },
        save(){   
            this.$refs['adminForm'].validate(async (valid)=>{
                if(valid){                   
                    const res = await this.$http.post('rest/admin_users', this.model) // eslint-disable-line no-unused-vars    
                    this.$router.push('/')
                    this.$message({
                        type:'success',
                        message:"保存成功"
                    })
                }
                else{
                    return false;
                }
            })
        }
    }
}
</script>