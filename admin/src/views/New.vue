<template>
    <div class="about">
        <h1> 添加音乐</h1>
        <el-form  @submit.native.prevent="save">
            <el-form-item label="歌曲名称" style="width:500px">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="专辑名称" style="width:500px">
                <el-input v-model="model.album"></el-input>
            </el-form-item>
            <el-form-item label="歌曲简介" style="width:500px">
                <el-input v-model="model.descrption"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">上传</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            model:{}
        }
    },
    methods:{
        async save(){
            const res = await this.$http.post('musics', this.model) // eslint-disable-line no-unused-vars
            this.$router.push('/')
            this.$message({
                type:'success',
                message:"保存成功"
            })
        }
    }
}
</script>