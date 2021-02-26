<template>    
    <el-container class="co1" >
        <el-header style="height:80px"> 
          周同学音乐
        </el-header>    
        
        <el-main >
          <div class="playListButton">
             <el-button  type="primary" @click="playMusicList()" icon="el-icon-video-play">播放歌单</el-button>
          </div>    
            <el-row :gutter="190" v-for="(item, i) in items" :key=i >    
              <el-col :span="12" :offset="7" >
                <div class="musicList" > 
                    <el-link href="#/test" class="musicLink" style="font-size:18px"><strong> {{item.name}}  ——《 {{item.album}} 》</strong></el-link>                      
                    <div class="inButton">
                      <el-button icon="el-icon-caret-right" circle type="primary" @click="startPlayOrPause(i)"></el-button>
                      <el-button :icon="iconTypeArray[i]" circle type="primary" @click="likeOrDislike(i)" ref="iconType"></el-button>
                    </div>                   
                </div>
               </el-col>          
            </el-row>
             <audio ref="audio"       
                src = ""
                @loadedmetadata="onLoadedmetadata"
                @ended="autoPlayNextSong()" 
                @timeupdate="onTimeUpdate" 
                 >
              </audio>
        </el-main>     
        <el-footer v-show="showPlayBar==true">
          <el-row type="flex" class="row-bg" justify="center" align="middle">
              <el-col :span="9" >
                <div class="playBar"  >
                  <div class="MusicWidgets">
                    <el-button @click="previous" circle icon="el-icon-back" size="mini"  style="background-color:#333; color:white;border-width:0px;font-size:20px"></el-button>
                    <el-button circle icon="el-icon-video-pause" size="mini" style="background-color:#333; color:white;border-width:0px;font-size:20px" @click="switchPlayStatus()" v-if="play==true"></el-button>  
                    <el-button circle icon="el-icon-caret-right" size="mini" style="background-color:#333; color:white;border-width:0px;font-size:20px" @click="switchPlayStatus()" v-if="play==false"></el-button>       
                    <a class="musicText"> {{currentMusicName}} </a>   
                    <el-slider class ="slider" v-model="sliderTime" :format-tooltip="formatProcessToolTip" @change="changeCurrentTime" @mousedown.native="isChange = true" @mouseup.native="isChange = false"></el-slider>           
                    <span class="musicTime"> {{formatCurrentTime}}/{{formatTotalTime}} </span>
                    <el-button @click="next" icon="el-icon-right" size="mini" style="margin-left:20px;background-color:#333; color:white;border-width:0px;font-size:20px" ></el-button>
                     <el-popover
                        placement="top"
                        title="播放列表"
                        :width="200"
                        trigger="click"
                      >
                      <ul>
                        <li v-for="(item, i) in items" :key=i>
                          {{item.name}}
                        </li>
                      </ul>
                        <template #reference>
                          <el-button type="text" style="color:white; margin-left:20px">播放列表</el-button>
                        </template>
                      </el-popover>      
                  </div>          
                </div>
              </el-col>
          </el-row>
        </el-footer>
    </el-container>   
</template>  

<style>
  html,body{
      margin:0;
      padding:0;
  }
  .musicTime{
    color: white;
    margin-top:7px;
    margin-left:10px
  }
  .playListButton{
    margin-bottom: 25px;
    margin-left: 30%
  }
  .el-main{
    margin-top:-60px;
  }
  .MusicWidgets{
     display: flex;
  }
  .musicText{
    font-size:17px;
    color:white;
    position: absolute;
    margin-left:110px;
    margin-top:-8px
  }
  .slider{
    width: 35rem;
    margin-left: 20px;
  }
  .el-footer{
    opacity: 0.92;
    background-color:#333 ;
    position: fixed;
    z-index: 1000;
    width: 100%;
    bottom: 0;
  }
  .row-bg{
    height: 100%;
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
    .playBar{   
      
      border-radius: 100px;
      min-height: 50px;
      
      display: flex;
      flex-direction: column;
      /* justify content主轴 align-items纵轴*/
      align-items: center;
      justify-content: center;
      height: 100%;
    }
   .el-row {   
     max-width: 100%; 
     margin-bottom: 20px;   
  }
  .el-col {
    border-radius: 4px;
  }
  .musicList{
    border-radius: 100px;
    min-height: 50px;
    overflow: hidden;
    background: #fffef8;
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
      iconTypeArray:[],
      play:true,
      showPlayBar:false,
      playList:[],
      currentMusicName:"",
      maxTime:0,
      currentTime:0,
      formatCurrentTime: "",
      formatTotalTime: "",
      sliderTime:0,
      isChange: false
    }
  },
  methods:{
    autoPlayNextSong(){
        for(var i =0;i<this.playList.length;i++){
          if(this.playList[i].address == this.$refs.audio.src){
            var index = i
            break
          }
        }
        if(index==this.playList.length-1){
          index = 0
        }
        else{
          index = index+1
        }       
        this.$refs.audio.src=this.playList[index].address
        this.$refs.audio.play()
        this.currentMusicName = this.playList[index].musicName
    },
    playMusicList(){
      this.play = true
      this.showPlayBar=true
      for(var i =0;i<this.items.length;i++){
        var name = this.items[i].name
        var address = this.items[i].musicAddress
        this.playList.push({"musicName":name,"address":address})
      }
      this.$refs.audio.src=this.playList[0].address
      this.$refs.audio.play()
      this.currentMusicName = this.playList[0].musicName
      
    },
    switchPlayStatus(){
        if(this.play==true){
          this.play=false
          this.$refs.audio.pause()
        }
        else{
          this.play=true
          this.$refs.audio.play()
        }
      },   
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
     onTimeUpdate(res){
      if(this.isChange==true) return
      var currentSecond = res.target.currentTime
      var minutes = Math.floor(currentSecond/60)
      var second = Math.round(currentSecond - (minutes*60))
      if(second <10){
        second = "0"+second
      }
      if(minutes < 10){
        minutes = "0"+minutes
      }
      this.currentTime = currentSecond
      this. formatCurrentTime = minutes + ":" + second    
      this.sliderTime = parseInt(this.currentTime / this.maxTime * 100)
    },
    formatProcessToolTip(index = 0) {
      index = parseInt(this.maxTime / 100 * index)
       var minutes = Math.floor(index / 60)
      var second = index - (minutes*60)
      if(minutes <10){
        minutes="0"+minutes
      }
      if(second<10){
        second="0"+second
      }
      var formatTotalTime = minutes+":"+second
      return formatTotalTime
    },
    changeCurrentTime(index) {
      this.$refs.audio.currentTime = parseInt(index / 100 * this.maxTime)
      this.isChange = false
    },
    previous(){
      this.play = true
       for(var i =0;i<this.playList.length;i++){
          if(this.playList[i].address == this.$refs.audio.src){
            var index = i
            break
          }
        }
        if(index==0){
          index=this.playList.length-1
        }
        else{
          index = index-1
        }
        this.$refs.audio.src=this.playList[index].address
        this.$refs.audio.play()
        this.currentMusicName = this.playList[index].musicName
    },
    next(){
      this.play = true
       for(var i =0;i<this.playList.length;i++){
          if(this.playList[i].address == this.$refs.audio.src){
            var index = i
            break
          }
        }
        if(index==this.playList.length-1){
          index=0
        }
        else{
          index = index+1
        }
        this.$refs.audio.src=this.playList[index].address
        this.$refs.audio.play()
        this.currentMusicName = this.playList[index].musicName
    },  
     startPlayOrPause(i){     
      this.showPlayBar=true
       //只允许播放一首
      for(var x =0;x<this.audio.length;x++){
        if(this.audio[x].playing==true){
          this.$refs.audio[x].pause()  
        }
      }  
      if(this.audio[i].playing){      
        this.$refs.audio[i].pause()
        this.audio[i].playing = false
        this.play=false
      }
      else{     
        this.$refs.audio[i].play()
        this.audio[i].playing = true
        this.play=true
      }
    },
    onLoadedmetadata(res) {  
      var totalSecond = parseInt(res.target.duration)
      var minutes = Math.floor(totalSecond / 60)
      var second = totalSecond - (minutes*60)
      if(minutes<10){
        minutes="0"+minutes
      }
      if(second<10){
        second="0"+second
      }
      this. formatTotalTime = minutes+":"+second
      this.maxTime = totalSecond
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