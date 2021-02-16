<template>    
    <el-container class="co1" >
        <el-header style="height:80px"> 
          周同学音乐
        </el-header>    
        <el-main >
            <el-row :gutter="190" v-for="(item, i) in items" :key=i >
              <audio ref="audio"       
                :src = item.musicAddress  >
              </audio>
              <el-col :span="12" :offset="7" >
                <div class="grid-content bg-color" > 
                    <el-link href="https://element.eleme.io" class="musicLink" style="font-size:18px"><strong> {{item.name}}  ——《 {{item.album}} 》</strong></el-link>                      
                    <div class="inButton">
                      <el-button icon="el-icon-caret-right" circle type="primary" @click="startPlayOrPause(i)"></el-button>
                      <el-button :icon="iconTypeArray[i]" circle type="primary" @click="likeOrDislike(i)" ref="iconType"></el-button>
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
  .el-header {
    
    margin-top: 30px;
    color: white;
    text-align: center; 
    padding-top: 10px;
    font-size: 45px;   
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
      margin-top:12px;
      margin-left:30px;
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
      iconTypeArray:[]
    }
  },
  methods:{
    likeOrDislike(i){
      //喜欢
      if(this.iconTypeArray[i]=='el-icon-star-off'){
        this.iconTypeArray[i]='el-icon-star-on'
        this.$refs.iconType[i].icon = 'el-icon-star-on'
        this.$message({
              type:'success',
              message:"收藏成功"
        })
      }
      //不喜欢
      else{
        this.iconTypeArray[i]='el-icon-star-off'
        this.$refs.iconType[i].icon ='el-icon-star-off'
        this.$message({
              type:'error',
              message:"取消收藏"
          })
      }
    },
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
      const res = await this.$http.get('/musics')
      this.items = res.data
      if(this.items.length>0){
        for(var i=0;i<this.items.length;i++){
          this.audio.push({"playing":false})
          //待修改
          this.iconTypeArray.push('el-icon-star-off')
        }
      }
      
      },
      
  },
  created(){
    this.fetch()
  }
}
</script>