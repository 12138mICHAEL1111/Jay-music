<template>
    <div class="about">
        <h1 style="margin-left:20px"> 编辑音乐</h1>
        <el-form :model='this.model' ref="musicForm"  @submit.native.prevent="save" :rules="rules"  >
            <div class="inputForm" style="margin-left:20px">
                <el-form-item label="歌曲名称" style="width:500px" prop="name" > 
                    <el-input v-model="model.name" ></el-input>
                </el-form-item>
                <el-form-item label="专辑名称" style="width:500px">
                    <el-input v-model="model.album"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" native-type="submit">上传</el-button>
                </el-form-item>
               
            </div>
        </el-form>
    </div>
</template>

<script>
export default {
    props:{
        id: {} //id名字可随意 与edit path 一致
    },
    data(){
        return{
            model:{},     
            rules:{   
                name:[
                    {required:true, messgae:'请输入歌曲名称',trigger:'blur'}                   
                ],       
            }
        }
    },
    methods:{
        save(){
            this.$refs['musicForm'].validate(async (valid)=>{
                if(valid){
                    const res = await this.$http.put(`rest/musics/${this.id}`,this.model) // eslint-disable-line no-unused-vars
                    this.$router.push('/')
                    this.$message({
                        type:'success',
                        message:"编辑成功"
                    })
                }
                else{
                    return false;
                }
            })
            
        },
        async fetch(){
            const res = await this.$http.get(`rest/musics/${this.id}`)
            this.model = res.data
        }
    },
    created(){
        this.fetch()
    }
}
</script>