<template>
  <div>
    <swiper :options="swiperOptions" class="banner">
      <swiper-slide class="cd">
        <div class="cd-warpper" ref="cdWarpper">
          <img :src="currentSong.picUrl" alt="" />
        </div>
        <p>{{ getFirstLyric() }}</p>
      </swiper-slide>
      <swiper-slide class="lyric" ref="lyric">
        <ScrollView ref="ScrollView">
          <ul>
            <li
              v-for="(value, key) in currentLyric"
              :key="key"
              :class="{ active: currentLineNum === key }"
            >
              {{ value }}
            </li>
          </ul>
        </ScrollView>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import ScrollView from "../ScrollView";
import { mapGetters } from "vuex";

export default {
  name: "PlayerMiddle",
  components: {
    swiper,
    swiperSlide,
    ScrollView,
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
          bulletClass: "my-bullet",
          bulletActiveClass: "my-bullet-active",
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
      },
      currentLineNum: "0",
    };
  },
  methods: {
    getFirstLyric() {
      for (let key in this.currentLyric) {
        return this.currentLyric[key];
      }
    },
    getActiveLineNum(lineNum) {
      if (lineNum < 0) {
        return this.currentLineNum;
      }
      let result = this.currentLyric[lineNum + ""];
      if (result === undefined || result === "") {
        lineNum--;
        return this.getActiveLineNum(lineNum);
      } else {
        return lineNum + "";
      }
    },
  },
  computed: {
    ...mapGetters(["isPlaying", "currentSong", "currentLyric"]),
  },
  watch: {
    isPlaying(newvalue, oldvalue) {
      if (newvalue) {
        this.$refs.cdWarpper.classList.add("active");
      } else {
        this.$refs.cdWarpper.classList.remove("active");
      }
    },
    currentTime(newvalue, oldvalue) {
      //1.歌词高亮同步
      let lineNum = Math.floor(newvalue);
      this.currentLineNum = this.getActiveLineNum(lineNum);
      // 2.歌词滚动同步
      let currentLyricTop = document.querySelector("li.active").offsetTop;
      let lyricHeight = this.$refs.lyric.$el.offsetHeight;
      if (currentLyricTop > lyricHeight / 2) {
        // console.log("开始滚动");
        this.$refs.ScrollView.scrollTo(
          0,
          lyricHeight / 2 - currentLyricTop,
          100
        );
      } else {
        this.$refs.ScrollView.scrollTo(0, 0, 100);
      }
    },
    currentLyric(newvalue, oldvalue) {
      for (let key in newvalue) {
        if (newvalue[key] !== "") {
          // console.log(key);
          this.currentLineNum = key;
          return;
        }
      }
    },
  },
  props: {
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
.banner {
  position: fixed;
  top: 150px;
  bottom: 250px;
  left: 0;
  right: 0;
  .cd {
    .cd-warpper {
      display: block;
      margin: 0 auto;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      border: 20px solid #fff;
      overflow: hidden;
      animation: sport 3s linear infinite;
      animation-play-state: paused;
      &.active {
        animation-play-state: running;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      text-align: center;
      @include font_size($font_medium);
      @include font_color();
      margin-top: 50px;
    }
  }
  .lyric {
    li {
      text-align: center;
      @include font_color();
      @include font_size($font_medium);
      margin: 10px 0;
      &:last-of-type {
        padding-bottom: 60%;
      }
      &.active {
        color: #fff;
        @include font_size($font_large);
      }
    }
  }
}
@keyframes sport {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

<style lang="scss">
@import "../../assets/css/mixin";
.my-bullet {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: #fff;
  margin: 0 10px;
}
.my-bullet-active {
  width: 50px;
  @include bg_color();
}
</style>