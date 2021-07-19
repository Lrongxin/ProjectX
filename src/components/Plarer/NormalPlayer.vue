<template>
  <transition :css="false" @enter="enter" @leave="leave">
    <div class="normal-player" v-show="this.isFullScreen">
      <div class="player-warpper">
        <PlayerHeader></PlayerHeader>
        <PlayerMiddle :currentTime="currentTime"></PlayerMiddle>
        <PlayerBottom
          :totalTime="totalTime"
          :currentTime="currentTime"
        ></PlayerBottom>
      </div>
      <div class="player-bg">
        <img :src="currentSong.picUrl" alt="" />
      </div>
    </div>
  </transition>
</template>

<script>
import PlayerHeader from "./PlayerHeader";
import PlayerMiddle from "./PlayerMiddle";
import PlayerBottom from "./PlayerBottom";
import { mapGetters, mapActions } from "vuex";
import Velocity from "velocity-animate";
import "velocity-animate/velocity.ui";

export default {
  name: "NormalPlayer",
  components: {
    PlayerHeader,
    PlayerMiddle,
    PlayerBottom,
  },
  methods: {
    ...mapActions(["getSongLyric"]),
    enter(el, done) {
      Velocity(
        el,
        "transition.shrinkIn",
        {
          duration: 500,
        },
        function () {
          done();
        }
      );
    },
    leave(el, done) {
      Velocity(
        el,
        "transition.shrinkOut",
        {
          duration: 500,
        },
        function () {
          done();
        }
      );
    },
  },
  computed: {
    ...mapGetters(["isFullScreen", "currentSong"]),
  },
  watch: {
    currentSong(newValue, oldValue) {
      if (newValue.id === "") {
        return;
      }
      this.getSongLyric(newValue.id);
      // console.log(newValue);
    },
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
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.normal-player {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  @include bg_sub_color();
  .player-warpper {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 999;
  }
  .player-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 100%;
      filter: blur(15px);
    }
  }
}
</style>