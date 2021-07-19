<template>
  <div class="player">
    <NormalPlayer
      :totalTime="totalTime"
      :currentTime="currentTime"
    ></NormalPlayer>
    <MiniPlayer></MiniPlayer>
    <ListPlayer ref="listplayer"></ListPlayer>
    <audio
      :src="currentSong.url"
      ref="audio"
      @timeupdate="timeupdate"
      @ended="end"
    ></audio>
  </div>
</template>

<script>
import NormalPlayer from "../components/Plarer/NormalPlayer";
import MiniPlayer from "../components/Plarer/MiniPlayer";
import ListPlayer from "../components/Plarer/ListPlayer";
import { mapGetters, mapActions } from "vuex";
import mode from "../store/mdeType";
import {
  getRandomIntInclusive,
  setLocalStorage,
  getLocalStorage,
} from "../tools/tools";

export default {
  name: "Player",
  data: function () {
    return {
      totalTime: 0,
      currentTime: 0,
    };
  },
  components: {
    NormalPlayer,
    ListPlayer,
    MiniPlayer,
  },
  methods: {
    ...mapActions([
      "setCurrentIndex",
      "setFavoriteList",
      "setHistorySong",
      "setHistoryList",
    ]),
    timeupdate(e) {
      // console.log(e.target.currentTime);
      this.currentTime = e.target.currentTime;
    },
    end() {
      // console.log("end");
      if (this.modeType === mode.loop) {
        this.setCurrentIndex(this.currentIndex + 1);
      } else if (this.modeType === mode.one) {
        this.$refs.audio.play();
      } else if (this.modeType === mode.random) {
        let index = getRandomIntInclusive(0, this.songs.length - 1);
        this.setCurrentIndex(index);
      }
    },
  },
  computed: {
    ...mapGetters([
      "currentSong",
      "isPlaying",
      "currentIndex",
      "curTime",
      "modeType",
      "songs",
      "favoriteList",
      "historyList",
    ]),
  },
  watch: {
    isPlaying(newValue, oldValue) {
      // console.log("执行了");
      if (newValue) {
        this.setHistorySong(this.currentSong);
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    },
    currentSong(newValue, oldValue) {
      this.$refs.audio.ondurationchange = () => {
        if (this.isPlaying) {
          this.setHistorySong(this.currentSong);
          this.totalTime = this.$refs.audio.duration;
          this.$refs.audio.play();
        } else {
          this.$refs.audio.pause();
        }
      };
    },
    currentIndex(newValue, oldValue) {
      this.$refs.audio.ondurationchange = () => {
        this.totalTime = this.$refs.audio.duration;
        if (this.isPlaying) {
          this.setHistorySong(this.currentSong);
          this.$refs.audio.play();
        } else {
          this.$refs.audio.pause();
        }
      };
    },
    curTime(newValue, oldValue) {
      this.$refs.audio.currentTime = newValue;
    },
    favoriteList(newValue, oldValue) {
      // window.localStorage.setItem("favoriteList", JSON.stringify(newValue));
      setLocalStorage("favoriteList", newValue);
    },
    historyList(newValue, oldValue) {
      // window.localStorage.setItem("historyList", JSON.stringify(newValue));
      setLocalStorage("historyList", newValue);
    },
  },
  created() {
    let list1 = getLocalStorage("favoriteList");
    if (list1 === null) {
      return;
    }
    this.setFavoriteList(list1);
    let list2 = getLocalStorage("historyList");
    if (list2 === null) {
      return;
    }
    this.setHistoryList(list2);
  },
  mounted() {
    this.$refs.audio.ondurationchange = () => {
      this.totalTime = this.$refs.audio.duration;
    };
  },
};
</script>

<style lang="scss" scoped>
</style>