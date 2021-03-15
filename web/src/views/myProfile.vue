<template>
    <div class="profile">
          <h2>个人资料</h2>
           <el-form :model='model' ref="profileForm"  @submit.native.prevent="save" :rules="rules"  >
            <div class="inputForm" style="margin-left:20px">
                <el-form-item label="用户名" style="width:500px" prop="username" > 
                    <el-input v-model="model.username" ></el-input>
                </el-form-item>
                 <el-upload
                    class="upload"   
                    :action="$http.defaults.baseURL + '/upload'"       
                    :on-success = "afterUpload"
                    :on-remove="handleRemove"    
                    :limit =1          
                    accept='.jpg, .png'         
                    >
                    <el-button size="small" type="primary">点我上传/修改头像</el-button>  
                </el-upload>
                <br><br>
                <el-form-item>
                    <el-button type="primary" native-type="submit">保存</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>

<style >
    .profile{
        margin-left: 50px;
    }
     .upload{
     width: 500px;
 }
</style>

<script>
export default {
    props:{
        id:{}
    },
    data(){
        return {
            originalName:"",
            filename:"",
            model:{},
             rules:{   
                username:[
                    {required:true, messgae:'请输入用户名',trigger:'blur'}                   
                ],       
            }
        }
    },
    methods:{
          save(){
            this.$refs['profileForm'].validate(async (valid)=>{
                if(valid){ 
                    if(this.originalName == this.model.username){
                        this.$router.push('/')
                        this.$message({
                        type:'success',
                        message:"编辑成功"
                    })
                    }
                    else{
                        const res = await this.$http.put(`user/edit/${this.id}`,this.model) // eslint-disable-line no-unused-vars
                        this.$router.push('/')
                        this.$message({
                            type:'success',
                            message:"编辑成功"
                        })
                    }
                }
                else{
                    return false;
                }
            })
            
        },
        async afterUpload(res){
            this.model.avataraddress = res.url
            this.filename = res.filename
            await this.$http.put(`user/edit/avatar/${this.id}`,this.model)
        },  
        handleRemove(){
             this.$http.delete(`/deleteuploadavatar/${this.filename}`)
        }, 
        async fetch(){
            const res = await this.$http.get(`/user/${this.id}`)
            this.model=res.data
            this.originalName = this.model.username
        },
    },
    created(){
        this.fetch()
    }
}
</script>