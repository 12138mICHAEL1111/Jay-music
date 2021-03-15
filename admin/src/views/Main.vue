<template>
  <el-container class="co1">
    <el-header style="height: 80px">
      <h1 class = "pagetitle"> 周同学音乐(admin) </h1>
      <div class="uploadButton">
        <el-button @click="$router.push('/musics/new')" type="primary"
          >新增音乐<i class="el-icon-upload el-icon--right"></i
        ></el-button>
        <br > <br>
        <el-button @click="$router.push('/admin/new')" type="primary"
          >新增管理员<i class="el-icon-user-solid"></i
        ></el-button>
      </div>
    </el-header>

    <el-main>
      <div class="playListButton">
        <el-button type="primary" @click="playMusicList()" icon="el-icon-video-play">播放歌单</el-button>
      </div>
      <el-row type="flex" class="row-bg" justify="center" align="middle" v-for="(item, i) in items" :key="i" 
        style="margin-top: 20px">
        <el-col :span="9">
          <div class="musicList">
            <span class="musictitle">
              {{ item.name }} ——《 {{ item.album }} 》</span>
            <div class="inButton">
              <el-button icon="el-icon-caret-right" circle type="primary" @click="playSingle(i)"></el-button>
              <el-button icon="el-icon-edit" circle type="info" @click="$router.push(`/musics/edit/${item._id}`)"></el-button>
              <el-button icon="el-icon-delete-solid" circle type="danger" @click="deleteMusic(item._id)"></el-button>
            </div>
          </div>
        </el-col>
      </el-row>
        <audio ref="audio" src="" @loadedmetadata="onLoadedmetadata" @ended="autoPlayNextSong()" @timeupdate="onTimeUpdate"></audio>
    </el-main>
    <el-footer v-show="showPlayBar == true">
      <el-row type="flex" class="row-bg" justify="center" align="middle">
        <el-col :span="9">
          <div class="playBar">
            <div class="MusicWidgets">
              <el-button @click="previous" circle icon="el-icon-back"  size="mini"
                style="
                  background-color: #333;
                  color: white;
                  border-width: 0px;
                  font-size: 20px;
                "></el-button>
              <el-button circle icon="el-icon-video-pause" size="mini"
                style="
                  background-color: #333;
                  color: white;
                  border-width: 0px;
                  font-size: 20px;
                "
                @click="switchPlayStatus()"
                v-if="play == true"></el-button>
              <el-button circle  icon="el-icon-caret-right" size="mini"
                style="
                  background-color: #333;
                  color: white;
                  border-width: 0px;
                  font-size: 20px;
                "
                @click="switchPlayStatus()"
                v-if="play == false" ></el-button>
              <a class="musicText"> {{ currentMusicName }} </a>
              <el-slider
                class="slider"
                v-model="sliderTime"
                :format-tooltip="formatProcessToolTip"
                @change="changeCurrentTime"
                @mousedown.native="isChange = true"
                @mouseup.native="isChange = false"
              ></el-slider>
              <span class="musicTime"> {{ formatCurrentTime }}/{{ formatTotalTime }} </span>
              <el-button @click="next" icon="el-icon-right" size="mini"
                style="
                  margin-left: 20px;
                  background-color: #333;
                  color: white;
                  border-width: 0px;
                  font-size: 20px;
                "></el-button>
              <el-popover placement="top"  title="播放列表" :width="200"  trigger="click">
                <ul>
                  <li v-for="(item, i) in playList" :key="i">
                    {{ item.musicName }}
                  </li>
                </ul>
                <template #reference>
                  <el-button type="text" style="color: white; margin-left: 20px">播放列表</el-button>
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
.MusicWidgets {
  display: flex;
}

.pagetitle {
  color: white;
  text-align: center;
  font-size: 45px;
  font-family: "Times New Roman", Georgia, Serif;
  margin-top: 30px;
}
.playListButton {
  margin-left: 32%;
}
.musicText {
  font-size: 17px;
  color: white;
  position: absolute;
  margin-left: 110px;
  margin-top: -8px;
}
.musicTime {
  color: white;
  margin-top: 7px;
  margin-left: 10px;
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
.uploadButton {
  position: absolute;
  text-align: left;
  margin-left: 72%;
  margin-top: -50px;
  z-index: 1000;
}

.el-header {
  padding-top: 10px;
}
.co1 {
  background-color: #f1939c;
  min-height: 100vh;
}
.bg-color {
  background: #fffef8;
}

.musicLink {
  color: rgb(248, 248, 248);
  margin-top: 12px;
  font-size: 18px;
  margin-left: 30px;
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
  data() {
    return {
      items: [],
       maxTime: 0,
      currentTime: 0,
      formatCurrentTime: "",
      formatTotalTime: "",
      sliderTime: 0,
      isChange: false,
       play: true,
      showPlayBar: false,
      playList: [],
      currentMusicName: "",
    };
  },
  methods: {
    startPlayOrPause(i) {
      //只允许播放一首
      for (var x = 0; x < this.audio.length; x++) {
        if (this.audio[x].playing == true) {
          this.$refs.audio[x].pause();
        }
      }
      if (this.audio[i].playing) {
        this.$refs.audio[i].pause();
        this.audio[i].playing = false;
      } else {
        this.$refs.audio[i].play();
        this.audio[i].playing = true;
      }
    },
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
      const res = await this.$http.get("rest/musics");
      this.items = res.data;
    },

    async deleteMusic(id) {
      this.$confirm("此操作将永久删除该歌曲, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$http.delete(`rest/musics/${id}`); // eslint-disable-line no-unused-vars
          this.fetch();
          this.$message({
            type: "success",
            message: "删除成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.fetch();
  },
};
</script>