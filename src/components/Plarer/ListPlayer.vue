<template>
  <transition :css="false" @enter="enter" @leave="leave">
    <div class="list-player" v-show="this.isShowListPlayer">
      <div class="player-warpper">
        <div class="player-top">
          <div class="top-left">
            <div class="mode loop" @click="mode" ref="mode"></div>
            <p v-if="this.modeType === 0">顺序播放</p>
            <p v-else-if="this.modeType === 1">单曲播放</p>
            <p v-else>随机播放</p>
          </div>
          <div class="top-right">
            <div class="del" @click="delAll"></div>
          </div>
        </div>
        <div class="player-middle">
          <ScrollView ref="ScrollView">
            <ul ref="play">
              <li
                class="item"
                v-for="(value, index) in songs"
                :key="value.id"
                @click="selectMusic(index)"
              >
                <div class="item-left">
                  <div
                    class="item-play"
                    @click="play"
                    v-show="currentIndex === index"
                  ></div>
                  <p>{{ value.name }}</p>
                </div>
                <div class="item-right">
                  <div
                    class="item-favorite"
                    @click.stop="favorite(value)"
                    :class="{ active: isFavorite(value) }"
                  ></div>
                  <div class="item-del" @click.stop="del(index)"></div>
                </div>
              </li>
            </ul>
          </ScrollView>
        </div>
        <div class="player-bottom">
          <p @click.stop="hidden">关闭</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ScrollView from "../ScrollView";
import Velocity from "velocity-animate";
import "velocity-animate/velocity.ui";
import { mapActions, mapGetters } from "vuex";
import modeType from "../../store/mdeType";

export default {
  name: "ListPlayer",
  methods: {
    hidden() {
      this.setListPlayer(false);
    },
    enter(el, done) {
      Velocity(
        el,
        "transition.perspectiveUpIn",
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
        "transition.perspectiveUpOut",
        {
          duration: 500,
        },
        function () {
          done();
        }
      );
    },
    ...mapActions([
      "setIsPlaying",
      "setModeType",
      "setListPlayer",
      "setDelSong",
      "setCurrentIndex",
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
    del(index) {
      this.setDelSong(index);
    },
    delAll() {
      this.setDelSong();
    },
    selectMusic(index) {
      this.setCurrentIndex(index);
    },
    favorite(value) {
      this.setFavoriteSong(value);
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
      "isShowListPlayer",
      "songs",
      "currentIndex",
      "favoriteList",
    ]),
  },
  components: {
    ScrollView,
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
    isShowListPlayer(newvalue, oldvalue) {
      if (newvalue) {
        this.$refs.ScrollView.refresh();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.list-player {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  @include bg_sub_color();
  .player-warpper {
    .player-top {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .top-left {
        display: flex;
        align-items: center;
        padding-left: 20px;
        .mode {
          margin-right: 20px;
          width: 56px;
          height: 56px;
          &.loop {
            @include bg_img("../../assets/images/small_loop");
          }
          &.one {
            @include bg_img("../../assets/images/small_one");
          }
          &.random {
            @include bg_img("../../assets/images/small_shuffle");
          }
        }
        p {
          @include font_color();
          @include font_size($font_medium_s);
        }
      }
      .top-right {
        .del {
          width: 84px;
          height: 84px;
          @include bg_img("../../assets/images/small_del");
        }
      }
    }
    .player-middle {
      ul {
        &.active {
          .item {
            .item-play {
              @include bg_img("../../assets/images/small_pause");
            }
          }
        }
      }
      height: 700px;
      overflow: hidden;
      .item {
        border-top: 1px solid #ccc;
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;
        .item-left {
          display: flex;
          align-items: center;
          .item-play {
            width: 56px;
            height: 56px;
            margin-right: 20px;
            @include bg_img("../../assets/images/small_play");
          }
          p {
            @include font_color();
            @include font_size($font_medium_s);
          }
        }
        .item-right {
          display: flex;
          align-items: center;
          .item-favorite {
            width: 56px;
            height: 56px;
            @include bg_img("../../assets/images/small_un_favorite");
            &.active {
              @include bg_img("../../assets/images/small_favorite");
            }
          }
          .item-del {
            width: 52px;
            height: 52px;
            margin-left: 20px;
            @include bg_img("../../assets/images/small_close");
          }
        }
      }
    }
    .player-bottom {
      width: 100%;
      height: 100px;
      line-height: 100px;
      @include bg_color();
      p {
        text-align: center;
        @include font_size($font_medium);
        color: #fff;
        font-weight: 700;
      }
    }
  }
}
</style>