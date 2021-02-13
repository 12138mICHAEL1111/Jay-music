<template>    
    <el-container class="co1" >
        <el-header style="height:80px"> 
          周同学音乐
          <div class="uploadButton">
            <el-button @click="$router.push('/musics/new')" type="primary" >新增音乐<i class="el-icon-upload el-icon--right"></i></el-button>
            <br>
            <el-button @click="$router.push('/admin/new')" type="primary" >新增管理员<i class="el-icon-user-solid"></i></el-button>
          </div>
        </el-header>
        
        <el-main >
            <el-row :gutter="200" v-for="(item, i) in items" :key=i >
              <audio ref="audio"       
                :src = item.musicAddress  >
              </audio>
              <el-col :span="12" :offset="7" >
                <div class="grid-content bg-color" >
                    <el-link href="https://element.eleme.io" :underline="false" class="musicLink" ><strong> {{item.name}} —— 《 {{item.album}} 》</strong></el-link>
                    <div class=inButton >
                      <el-button icon="el-icon-caret-right" circle type="primary" @click="startPlayOrPause(i)"></el-button> 
                      <el-button icon="el-icon-edit" circle  type="info" @click = "$router.push(`/musics/edit/${item._id}`)"></el-button>    
                      <el-button icon="el-icon-delete-solid" circle  type="danger" @click="deleteMusic(item._id)"></el-button>                    
                    </div>                   
                </div>
               </el-col>          
            </el-row>
        </el-main>     
    </el-container>   
</template>  

<style>
  
  html,body{
      margin:0;
      padding:0;
  }
   .uploadButton{  
     position: absolute;
     text-align: left;
     margin-left: 72%;
     margin-top: -50px;
     z-index: 1000;
   }

  .el-header {
    margin-top: 30px;
    color: white;
    text-align: center; 
    padding-top: 10px;
    font-size: 40px;   
    font-family:"Times New Roman",Georgia,Serif;
    }
    .co1{
     background-color: #f1939c;
     min-height: 100vh;    
    }
   .el-row {   
     
     max-width: 100%; 
     margin-bottom: 20px;   
  }
  .el-col {
    border-radius: 4px;
  }

  .bg-color {
    background: #fffef8;
  }
    .grid-content {
    
    border-radius: 100px;
    min-height: 50px;
    overflow: hidden;
 
  }
    .musicLink{
      color: rgb(248, 248, 248);
      margin-top:12px;
      font-size: 18px;
      margin-left: 30px;
    }
    .inButton{
      display: inline;
      margin-right:10px;
      margin-top:5px;
      float:right
    }
</style>

<script>
export default {
  data(){
    return{
      items:[],
      audio:[{}],
      
    }
  },
  methods:{
     startPlayOrPause(i){     
       //只允许播放一首
      for(var x =0;x<this.audio.length;x++){
        if(this.audio[x].playing==true){
          this.$refs.audio[x].pause()  
        }
      }  
      if(this.audio[i].playing){      
        this.$refs.audio[i].pause()
        this.audio[i].playing = false
      }
      else{     
        this.$refs.audio[i].play()
        this.audio[i].playing = true
      }
    },

    async fetch(){
      const res = await this.$http.get('rest/musics')
      this.items = res.data
      if(this.items.length>0){
        for(var i=0;i<this.items.length;i++){
          console.log("x")
          this.audio.push({"playing":false})
        }
      }
      
      },
      
    async deleteMusic(id){
          this.$confirm('此操作将永久删除该歌曲, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async()=>{
        const res = await this.$http.delete(`rest/musics/${id}`) // eslint-disable-line no-unused-vars
        this.fetch()
        this.$message({
            type:'success',
            message:"删除成功"
        })
      })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })  
        }) 
    },
  },
  created(){
    this.fetch()
  }
  
}
</script>