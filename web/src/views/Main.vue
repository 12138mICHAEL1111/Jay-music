<template>
  <el-container class="co1">
    <el-header style="height: 80px">
      <h1 class="pagetitle">周同学音乐</h1>
      <div class="avatar">
        <el-dropdown @command="handleCommand">
          <img :src=" avatarurl ? avatarurl : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' " class="avatarimage" >
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="myCollection">我的收藏</el-dropdown-item>
            <el-dropdown-item command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item command="logoff" v-show="userToken">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-main>
      <div class="playListButton">
        <el-button
          type="primary"
          @click="playMusicList()"
          icon="el-icon-video-play"
          >播放歌单</el-button>
      </div>
      <el-row
        type="flex"
        class="row-bg"
        justify="center"
        align="middle"
        v-for="(item, i) in items"
        :key="i"
        style="margin-top: 20px">
        <el-col :span="9">
          <div class="musicList">
            <span class="musictitle">
              {{ item.name }} ——《 {{ item.album }} 》</span>
            <div class="inButton">
              <el-button
                icon="el-icon-caret-right"
                circle
                type="primary"
                @click="playSingle(i)"
              ></el-button>
              <el-button
                :icon="iconTypeArray[i]"
                circle
                type="primary"
                @click="likeOrDislike(i)"
                ref="iconType"
              ></el-button>
            </div>
          </div>
        </el-col>
      </el-row>
      <audio
        ref="audio"
        src=""
        @loadedmetadata="onLoadedmetadata"
        @ended="autoPlayNextSong()"
        @timeupdate="onTimeUpdate">
        </audio>
      <div class="dialog" >
        <el-button type="text" @click="dialogVisible = true">关于周杰伦音乐的版权声明</el-button>
        <el-dialog
        title="提示"
        append-to-body='true'
        :visible.sync="dialogVisible"
        width="30%">
        <span>此网站上的所有周杰伦音乐仅仅作为Michael的编程项目的所需资源，并不用作商业用途，最终版权归周杰伦所有。</span>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-main>
    <el-footer v-show="showPlayBar == true">
      <el-row type="flex" class="row-bg" justify="center" align="middle">
        <el-col :span="9">
          <div class="playBar">
            <div class="MusicWidgets">
              <el-button
                @click="previous"
                circle
                icon="el-icon-back"
                size="mini"
                style="
                  background-color: #333;
                  color: white;
                  border-width: 0px;
                  font-size: 20px;
                "
              ></el-button>
              <el-button
                circle
                icon="el-icon-video-pause"
                size="mini"
                style="
                  background-color: #333;
                  color: white;
                  border-width: 0px;
                  font-size: 20px;
                "
                @click="switchPlayStatus()"
                v-if="play == true"
              ></el-button>
              <el-button
                circle
                icon="el-icon-caret-right"
                size="mini"
                style="
                  background-color: #333;
                  color: white;
                  border-width: 0px;
                  font-size: 20px;
                "
                @click="switchPlayStatus()"
                v-if="play == false"
              ></el-button>
              <a class="musicText"> {{ currentMusicName }} </a>
              <el-slider
                class="slider"
                v-model="sliderTime"
                :format-tooltip="formatProcessToolTip"
                @change="changeCurrentTime"
                @mousedown.native="isChange = true"
                @mouseup.native="isChange = false"
              ></el-slider>
              <span class="musicTime">
                {{ formatCurrentTime }}/{{ formatTotalTime }}
              </span>
              <el-button
                @click="next"
                icon="el-icon-right"
                size="mini"
                style="
                  margin-left: 20px;
                  background-color: #333;
                  color: white;
                  border-width: 0px;
                  font-size: 20px;
                "
              ></el-button>
              <el-popover
                placement="top"
                title="播放列表"
                :width="200"
                trigger="click"
              >
                <ul>
                  <li v-for="(item, i) in playList" :key="i">
                    {{ item.musicName }}
                  </li>
                </ul>
                <template #reference>
                  <el-button type="text" style="color: white; margin-left: 20px"
                    >播放列表</el-button >
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
html,
body {
  margin: 0;
  padding: 0;
}
.musicTime {
  color: white;
  margin-top: 7px;
  margin-left: 10px;
}
.playListButton {
  display: inline;
  margin-left: 32%;
}
.avatarimage {
  height: 60px;
  width: 60px;
  border-radius: 30px;
}

.MusicWidgets {
  display: flex;
}
.pagetitle {
  color: white;
  text-align: center;
  font-size: 50px;
  font-family: "Times New Roman", Georgia, Serif;
  margin-top: 30px;
}
.dialog{
  display: inline;
  position: fixed;
  bottom:50px;
  left: 80%;
}
.musicText {
  font-size: 17px;
  color: white;
  position: absolute;
  margin-left: 110px;
  margin-top: -8px;
}

.slider {
  width: 35rem;
  margin-left: 20px;
}
.el-footer {
  opacity: 0.92;
  background-color: #333;
  position: fixed;
  z-index: 1000;
  width: 100%;
  bottom: 0;
}
.row-bg {
  height: 100%;
}

.el-header {
  padding-top: 10px;
}
.co1 {
  background-color: #f1939c;
  min-height: 100vh;
}
.playBar {
  border-radius: 100px;
  min-height: 50px;

  display: flex;
  flex-direction: column;
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
.musicList {
  border-radius: 100px;
  min-height: 50px;
  overflow: hidden;
  background: #fffef8;
  height: 100%;
}
.musictitle {
  display: inline-block;
  font-size: 20px;
  margin-left: 30px;
  margin-top: 12px;
  font-family: "Times New Roman", Georgia, Serif;
}
.inButton {
  display: inline;
  margin-right: 10px;
  margin-top: 5px;
  float: right;
}
</style>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      avatarurl: "",
      userToken: "",
      items: [],
      iconTypeArray: [],
      play: true,
      showPlayBar: false,
      playList: [],
      currentMusicName: "",
      maxTime: 0,
      currentTime: 0,
      formatCurrentTime: "",
      formatTotalTime: "",
      sliderTime: 0,
      isChange: false,
      likemusic: [],
      dialogVisible: false
    };
  },
  methods: {
    autoPlayNextSong() {
      for (var i = 0; i < this.playList.length; i++) {
        if (this.playList[i].address == this.$refs.audio.src) {
          var index = i;
          break;
        }
      }
      if (index == this.playList.length - 1) {
        index = 0;
      } else {
        index = index + 1;
      }
      this.$refs.audio.src = this.playList[index].address;
      this.$refs.audio.play();
      this.currentMusicName = this.playList[index].musicName;
    },
    playMusicList() {
      this.play = true;
      this.showPlayBar = true;
      this.playList.splice(0, this.playList.length);
      for (var i = 0; i < this.items.length; i++) {
        var name = this.items[i].name;
        var address = this.items[i].musicAddress;
        this.playList.push({ musicName: name, address: address });
      }
      this.$refs.audio.src = this.playList[0].address;
      this.$refs.audio.play();
      this.currentMusicName = this.playList[0].musicName;
    },
    switchPlayStatus() {
      if (this.play == true) {
        this.play = false;
        this.$refs.audio.pause();
      } else {
        this.play = true;
        this.$refs.audio.play();
      }
    },
    likeOrDislike(i) {
      //喜欢
      if (!localStorage.userToken) {
        this.$router.push("/login");
        this.$message({
          type: "warning",
          message: "请先登录",
        });
      } else {
        if (this.iconTypeArray[i] == "el-icon-star-off") {
          this.iconTypeArray[i] = "el-icon-star-on";
          this.$refs.iconType[i].icon = "el-icon-star-on";
          var musicid = this.items[i]._id;
          this.likemusic.push(musicid);
          this.$http.post("/music/like", {
            id: localStorage.id,
            musicid: this.likemusic,
          });
          this.likemusic.splice(0,this.likemusic.length)
          this.$message({
            type: "success",
            message: "收藏成功",
          });
        }
        //不喜欢
        else {
          this.iconTypeArray[i] = "el-icon-star-off";
          this.$refs.iconType[i].icon = "el-icon-star-off";
          var id = this.items[i]._id;
          this.likemusic.push(id);
           this.$http.post("/music/dislike", {
            id: localStorage.id,
            musicid: this.likemusic,
          });
           this.likemusic.splice(0,this.likemusic.length)
          this.$message({
            type: "error",
            message: "取消收藏",
          });
        }
      }
    },
    handleCommand(command) {
      if (command == "myCollection") {
        this.$router.push(`/my-music/${localStorage.id}`);
      } else if (command == "setting") {
        this.$router.push(`/my-profile/edit/${localStorage.id}`);
      } else if (command == "logoff") {
        localStorage.clear();
        this.$message({
          type: "success",
          message: "注销成功",
        });
        this.reload();
      }
    },
    onTimeUpdate(res) {
      if (this.isChange == true) return;
      var currentSecond = res.target.currentTime;
      var minutes = Math.floor(currentSecond / 60);
      var second = Math.round(currentSecond - minutes * 60);
      if (second < 10) {
        second = "0" + second;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      this.currentTime = currentSecond;
      this.formatCurrentTime = minutes + ":" + second;
      this.sliderTime = parseInt((this.currentTime / this.maxTime) * 100);
    },
    formatProcessToolTip(index = 0) {
      index = parseInt((this.maxTime / 100) * index);
      var minutes = Math.floor(index / 60);
      var second = index - minutes * 60;
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (second < 10) {
        second = "0" + second;
      }
      var formatTotalTime = minutes + ":" + second;
      return formatTotalTime;
    },
    changeCurrentTime(index) {
      this.$refs.audio.currentTime = parseInt((index / 100) * this.maxTime);
      this.isChange = false;
    },
    previous() {
      this.play = true;
      for (var i = 0; i < this.playList.length; i++) {
        if (this.playList[i].address == this.$refs.audio.src) {
          var index = i;
          break;
        }
      }
      if (index == 0) {
        index = this.playList.length - 1;
      } else {
        index = index - 1;
      }
      this.$refs.audio.src = this.playList[index].address;
      this.$refs.audio.play();
      this.currentMusicName = this.playList[index].musicName;
    },
    next() {
      this.play = true;
      for (var i = 0; i < this.playList.length; i++) {
        if (this.playList[i].address == this.$refs.audio.src) {
          var index = i;
          break;
        }
      }
      if (index == this.playList.length - 1) {
        index = 0;
      } else {
        index = index + 1;
      }
      this.$refs.audio.src = this.playList[index].address;
      this.$refs.audio.play();
      this.currentMusicName = this.playList[index].musicName;
    },
    playSingle(i) {
      this.play = true;
      this.showPlayBar = true;
      this.currentMusicName = this.items[i].name;
      var flag = false;
      for (var x = 0; x < this.playList.length; x++) {
        if (this.playList[x].address == this.items[i].musicAddress) {
          flag = true;
          break;
        }
      }
      if (flag == false) {
        var address = this.items[i].musicAddress;
        this.playList.push({
          musicName: this.currentMusicName,
          address: address,
        });
      }
      this.$refs.audio.src = this.items[i].musicAddress;
      this.$refs.audio.play();
    },
    onLoadedmetadata(res) {
      var totalSecond = parseInt(res.target.duration);
      var minutes = Math.floor(totalSecond / 60);
      var second = totalSecond - minutes * 60;
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (second < 10) {
        second = "0" + second;
      }
      this.formatTotalTime = minutes + ":" + second;
      this.maxTime = totalSecond;
    },
    async fetch() {
      const res = await this.$http.get("/musics");
      this.userToken = localStorage.userToken;
      this.items = res.data;
      const userResponse = await this.$http.post("/avatar", {
        id: localStorage.id,
      });
      this.avatarurl = userResponse.data.avataraddress;
      const likeres = await this.$http.post("/user/musicliked", {
        id: localStorage.id,
      });
      if(likeres.data.message == "fail"){
         for (var x = 0; x < this.items.length; x++) {
           this.iconTypeArray.push("el-icon-star-off");
         }
      }else{
        const likeMusicArray = likeres.data.likemusic;
        var flag = false;
          for (var i = 0; i < this.items.length; i++) {
            for (var j = 0; j < likeMusicArray.length; j++) {
              if (this.items[i]._id == likeMusicArray[j]._id) {
                flag = true;
                break;
              }
            }
            if (flag == true) {
              this.iconTypeArray.push("el-icon-star-on");
            } else {
              this.iconTypeArray.push("el-icon-star-off");
            }
            flag = false;

            //待修改
            //this.iconTypeArray.push('el-icon-star-off')
        }
      }
      
    },
  },
  created() {
    this.fetch();
  },
};
</script>