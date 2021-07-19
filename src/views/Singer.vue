<template>
  <div class="singer">
    <div class="sing-wrapper">
      <ScrollView ref="scrollView">
        <ul class="list-wrapper">
          <li
            class="list-group"
            v-for="(value, index) in list"
            :key="index"
            ref="group"
          >
            <h2 class="group-title">{{ keys[index] }}</h2>
            <ul>
              <li
                class="group-item"
                v-for="obj in list[index]"
                :key="obj.id"
                @click.stop="switchSinger(obj.id)"
              >
                <img v-lazy="obj.img1v1Url" alt="" />
                <p>{{ obj.name }}</p>
              </li>
            </ul>
          </li>
        </ul>
      </ScrollView>
      <ul class="list-keys">
        <li
          v-for="(key, index) in keys"
          :key="key"
          :data-index="index"
          @touchstart.stop.prevent="touchstart"
          @touchmove.stop.prevent="touchmove"
          :class="{
            active: currentIndex === index,
          }"
        >
          {{ key }}
        </li>
      </ul>
      <div class="fix-title" v-show="fixTitle !== ''" ref="fixTitle">
        {{ fixTitle }}
      </div>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
// import { getHotArtists } from "../api/index";
// import { getLetterArtists } from "../api/index";
import { getAllArtists } from "../api/index";
import ScrollView from "../components/ScrollView";
export default {
  name: "Singer",
  components: {
    ScrollView,
  },
  methods: {
    _keyDown(index) {
      this.currentIndex = index;
      // console.log(index);
      let offsetY = this.groupTop[index];
      // console.log(offsetY);
      this.$refs.scrollView.scrollTo(0, -offsetY);
    },
    touchstart(e) {
      //dataset属性可以访问自定义属性集
      // console.log(e.target.dataset.index);
      // console.log(this.currentIndex);
      let index = parseInt(e.target.dataset.index);
      this._keyDown(index);
      this.beginOffsetY = e.touches[0].pageY;
    },
    touchmove(e) {
      this.moveOffsetY = e.touches[0].pageY;
      let offsetY =
        (this.moveOffsetY - this.beginOffsetY) / e.target.offsetHeight;
      // console.log(offsetY);
      let index = parseInt(e.target.dataset.index) + Math.floor(offsetY);
      if (index < 0) {
        index = 0;
      } else if (index > this.keys.length - 1) {
        index = this.keys.length - 1;
      }
      this._keyDown(index);
    },
    switchSinger(id) {
      this.$router.push(`/singer/detail/${id}/singer`);
    },
  },
  created() {
    getAllArtists()
      .then((result) => {
        // console.log(result);
        this.keys = result.keys;
        this.list = result.list;
      })
      .catch(function (err) {
        console.log(err);
      });
  },
  mounted() {
    this.$refs.scrollView.scrolling((y) => {
      this.scrollY = y;
      // console.log(y);
      //处理第一个区域
      if (y >= 0) {
        this.currentIndex = 0;
        return;
      }
      //处理中间的区域
      for (let i = 0; i < this.groupTop.length - 1; i++) {
        let preTop = this.groupTop[i];
        let nextTop = this.groupTop[i + 1];
        if (-y >= preTop && -y <= nextTop) {
          this.currentIndex = i;
          // 1.用下一组标题的偏移位 + 当前滚动出去的偏移位
          let diffOffsetY = nextTop + y;
          let fixTitleOffsetY = 0;
          // 2.判断计算的结果是否是 0 ~ 分组标题高度的值
          if (diffOffsetY >= 0 && diffOffsetY <= this.fixTitleHeight) {
            // 满足条件开始移动上一组标题
            fixTitleOffsetY = diffOffsetY - this.fixTitleHeight;
          } else {
            // 不满足条件需要固定在顶部
            fixTitleOffsetY = 0;
          }
          if (fixTitleOffsetY === this.fixTitleOffsetY) {
            return;
          }
          this.fixTitleOffsetY = fixTitleOffsetY;
          this.$refs.fixTitle.style.transform = `translateY(${fixTitleOffsetY}px)`;
          return;
        }
      }
      //处理最后一个区域
      this.currentIndex = this.groupTop.length - 1;
    });
  },
  data() {
    return {
      keys: [],
      list: [],
      groupTop: [],
      currentIndex: 0,
      beginOffsetY: 0,
      moveOffsetY: 0,
      scrollY: 0,
    };
  },
  watch: {
    list() {
      this.$nextTick(() => {
        // console.log(this.$refs.group);
        this.$refs.group.forEach((group) => {
          this.groupTop.push(group.offsetTop);
        });
        // console.log(this.groupTop);
      });
    },
    fixTitle() {
      this.$nextTick(() => {
        this.fixTitleHeight = this.$refs.fixTitle.offsetHeight;
      });
    },
  },
  computed: {
    fixTitle() {
      if (this.scrollY >= 0) {
        return "";
      } else {
        return this.keys[this.currentIndex];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/mixin";
@import "../assets/css/variable";
.singer {
  width: 100%;
  height: 100%;
  .sing-wrapper {
    position: fixed;
    top: 184px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    @include bg_sub_color();
    .list-wrapper {
      overflow: hidden;
      .list-group {
        .group-title {
          @include bg_color();
          @include font_size($font_medium);
          color: #fff;
          padding: 10px 20px;
          box-sizing: border-box;
        }
        .group-item {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 10px 20px;
          border-bottom: 1px solid #ccc;
          img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 20px;
          }
        }
      }
    }
    .list-keys {
      position: fixed;
      right: 10px;
      top: 55%;
      transform: translateY(-50%);
      li {
        @include font_size($font_medium_s);
        @include font_color();
        padding: 3px 0;
        text-align: center;
        width: 30px;
        height: 30px;
        line-height: 30px;
        border-radius: 10px;
        &.active {
          @include bg_color();
          // text-shadow: 0 0 10px #000;
        }
      }
    }
    .fix-title {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      padding: 10px 20px;
      @include font_size($font_medium);
      @include bg_color();
      color: #fff;
      box-sizing: border-box;
    }
  }
}
.v-enter {
  transform: translateX(100%);
}
.v-enter-to {
  transform: translateX(0%);
}
.v-enter-active {
  transition: transform 0.5s;
}
.v-leave {
  transform: translateX(0%);
}
.v-leave-to {
  transform: translateX(100%);
}
.v-leave-active {
  transition: transform 0.5s;
}
</style>