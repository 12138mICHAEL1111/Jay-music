<template>
    <div class="about">
        <h1 style="margin-left:20px"> 添加音乐</h1>
        <el-form :model=this.model @submit.native.prevent="save" ref="musicForm" :rules="rules">
            <div class="inputForm" style="margin-left:20px">
                <el-form-item label="歌曲名称" style="width:500px" prop="name">
                    <el-input v-model="model.name"></el-input>
                </el-form-item>
                <el-form-item label="专辑名称" style="width:500px" prop="album"> 
                    <el-input v-model="model.album"></el-input>
                </el-form-item>
                <el-upload
                    class="upload"                  
                    :action="$http.defaults.baseURL + '/upload'"       
                    :on-success = "afterUpload"
                    :on-remove="handleRemove"    
                    :limit =1          
                    accept='.mp3, .wma, .flac'         
                    >
                    <el-button size="small" type="primary">点我上传音乐</el-button>  
                </el-upload>
                <br><br><br><br><br><br>
                <el-form-item>
                    <el-button type="primary" native-type="submit" >提交表单</el-button>
                </el-form-item>
                <el-button type='warning' @click='back' >返回</el-button>
            </div>
        </el-form>   
    </div>
</template>

<style >
 .upload{
     width: 500px;
 }
</style>

<script>
export default {
    data(){
        return{
            model:{},
             rules:{   
                name:[
                    {required:true,trigger:'blur'}                   
                ],     
                album:[
                     {required:true,trigger:'blur'}  
                ], 
            },
            filename: ''
        }
    },
    methods:{      
        back(){
            this.$router.go(-1)
        },
        afterUpload(res){
            this.model.musicAddress = res.url
            this.filename = res.filename
        },   
        async handleRemove(){
            this.$http.delete(`/deleteuploadavatar/${this.filename}`)
        },
        save(){   
            this.$refs['musicForm'].validate(async (valid)=>{
                if(valid){                   
                    const res = await this.$http.post('rest/musics', this.model) // eslint-disable-line no-unused-vars    
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