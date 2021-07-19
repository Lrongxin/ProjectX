<template>
  <div class="player-bottom">
    <div class="bottom-progress">
      <span ref="eleCurrentTime">00:00</span>
      <div class="progress-bar" @click="progressClick" ref="progressBar">
        <div class="progress-line" ref="line">
          <div class="progress-dot"></div>
        </div>
      </div>
      <span ref="eleTotalTime">00:00</span>
    </div>
    <div class="bottom-controll">
      <div class="mode loop" @click="mode" ref="mode"></div>
      <div class="prev" @click="prev"></div>
      <div class="play" @click="play" ref="play"></div>
      <div class="next" @click="next"></div>
      <div
        class="favorite"
        @click="favorite"
        :class="{ active: isFavorite(currentSong) }"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import modeType from "../../store/mdeType";
import { formartTime } from "../../tools/tools";

export default {
  name: "PlayerBottom",
  methods: {
    ...mapActions([
      "setIsPlaying",
      "setModeType",
      "setCurrentIndex",
      "setCurTime",
      "setFavoriteSong",
    ]),
    play() {
      this.setIsPlaying(!this.isPlaying);
    },
    mode() {
      if (this.modeType === modeType.loop) {
        this.setModeType(modeType.one);
      } else if (this.modeType === modeType.one) {
        this.setModeType(modeType.random);
      } else if (this.modeType === modeType.random) {
        this.setModeType(modeType.loop);
      }
    },
    prev() {
      this.setCurrentIndex(this.currentIndex - 1);
    },
    next() {
      this.setCurrentIndex(this.currentIndex + 1);
    },
    favorite() {
      this.setFavoriteSong(this.currentSong);
    },
    progressClick(e) {
      //1.计算进度条点击后的位置
      // let normallLeft = e.target.offsetLeft;
      let normallLeft = this.$refs.progressBar.offsetLeft;
      let eventLeft = e.pageX;
      let clickLeft = eventLeft - normallLeft;
      let progressWidth = this.$refs.progressBar.offsetWidth;
      let value = clickLeft / progressWidth;
      this.$refs.line.style.width = value * 100 + "%";
      //2.计算进度条点击后的播放时间
      let currentTime = value * this.totalTime;
      // console.log(currentTime);
      this.setCurTime(currentTime);
    },
    isFavorite(song) {
      let result = this.favoriteList.find(function (currentValue) {
        return currentValue.id === song.id;
      });
      return result !== undefined;
    },
  },
  computed: {
    ...mapGetters([
      "isPlaying",
      "modeType",
      "currentIndex",
      "currentSong",
      "favoriteList",
    ]),
  },
  props: {
    totalTime: {
      type: Number,
      default: 0,
      required: true,
    },
    currentTime: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  watch: {
    isPlaying(newvalue, oldvalue) {
      if (newvalue) {
        this.$refs.play.classList.add("active");
      } else {
        this.$refs.play.classList.remove("active");
      }
    },
    modeType(newvalue, oldvalue) {
      if (newvalue === modeType.loop) {
        this.$refs.mode.classList.remove("random");
        this.$refs.mode.classList.add("loop");
      } else if (newvalue === modeType.one) {
        this.$refs.mode.classList.remove("loop");
        this.$refs.mode.classList.add("one");
      } else if (newvalue === modeType.random) {
        this.$refs.mode.classList.remove("one");
        this.$refs.mode.classList.add("random");
      }
    },
    totalTime(newValue, oldValue) {
      let time = formartTime(newValue);
      this.$refs.eleTotalTime.innerHTML = time.minute + ":" + time.second;
    },
    currentTime(newValue, oldValue) {
      //1.格式化播放时间
      let time = formartTime(newValue);
      this.$refs.eleCurrentTime.innerHTML = time.minute + ":" + time.second;
      //2.计算播放时间和总时间的比例，设置播放进度条的宽度
      let value = (newValue / this.totalTime) * 100;
      this.$refs.line.style.width = value + "%";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.player-bottom {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  .bottom-progress {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      @include font_size($font_samll);
      @include font_color();
    }
    .progress-bar {
      width: 100%;
      margin: 0 10px;
      height: 15px;
      background: #fff;
      border-radius: 10px;
      .progress-line {
        position: relative;
        width: 0%;
        height: 100%;
        background: #ccc;
        border-radius: 10px;
        .progress-dot {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #fff;
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
  .bottom-controll {
    width: 80%;
    margin: 0 auto;
    padding: 50px 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      width: 84px;
      height: 84px;
    }
    .mode {
      &.loop {
        @include bg_img("../../assets/images/loop");
      }
      &.one {
        @include bg_img("../../assets/images/one");
      }
      &.random {
        @include bg_img("../../assets/images/shuffle");
      }
    }
    .prev {
      @include bg_img("../../assets/images/prev");
    }
    .play {
      @include bg_img("../../assets/images/play");
      &.active {
        @include bg_img("../../assets/images/pause");
      }
    }
    .next {
      @include bg_img("../../assets/images/next");
    }
    .favorite {
      @include bg_img("../../assets/images/un_favorite");
      &.active {
        @include bg_img("../../assets/images/favorite");
      }
    }
  }
}
</style>