<template>
  <div class="rank">
    <div class="rank-wrapper">
      <ScrollView>
        <ul>
          <li v-for="(value, key) in category.titles" :key="key">
            <h3 class="group-title">{{ value }}</h3>
            <ul class="normal-group" v-if="value === '官方榜'">
              <li
                v-for="obj in category[key]"
                :key="obj.id"
                @click.stop="selectItem(obj.id)"
              >
                <div class="rank-left">
                  <img v-lazy="obj.rank.coverImgUrl" alt="" />
                  <p>{{ obj.rank.updateFrequency }}</p>
                </div>
                <div class="rank-right">
                  <p v-for="(song, index) in obj.rank.tracks" :key="song.first">
                    {{ index + 1 }}.{{ song.first }}-{{ song.second }}
                  </p>
                </div>
              </li>
            </ul>
            <ul class="other-group" v-else>
              <li
                v-for="item in category[key]"
                :key="item.id"
                @click.stop="selectItem(item.id)"
              >
                <div class="rank-top">
                  <img v-lazy="item.rank.coverImgUrl" alt="" />
                  <p>{{ item.updateFrequency }}</p>
                </div>
                <div class="rank-bottom">
                  <p>{{ item.name }}</p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </ScrollView>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getTopListDetail } from "../api/index";
import ScrollView from "../components/ScrollView";

export default {
  name: "Rank",
  components: {
    ScrollView,
  },
  data() {
    return {
      category: {},
    };
  },
  methods: {
    selectItem(id) {
      this.$router.push(`/rank/detail/${id}/rank`);
    },
  },
  created() {
    getTopListDetail()
      .then((data) => {
        // console.log(data);
        this.category = data;
      })
      .catch(function (err) {
        console.log(err);
      });
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/variable";
@import "../assets/css/mixin";
.rank {
  width: 100%;
  height: 100%;
  .rank-wrapper {
    position: fixed;
    top: 184px;
    left: 0;
    right: 0;
    bottom: 0;
    @include bg_sub_color();
    overflow: hidden;
    .group-title {
      padding: 10px 20px;
      @include font_color();
      @include font_size($font_large);
      font-weight: bold;
    }
    .normal-group {
      li {
        padding: 10px 20px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        .rank-left {
          position: relative;
          img {
            width: 200px;
            height: 200px;
            border-radius: 10px;
          }
          p {
            position: absolute;
            bottom: 10px;
            left: 10px;
            color: #fff;
            @include font_size($font_medium_s);
          }
        }
        .rank-right {
          margin-left: 20px;
          p {
            @include font_size($font_medium_s);
            @include font_color();
            padding: 10px 0;
          }
        }
      }
    }
    .other-group {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        padding: 10px 20px;
        box-sizing: border-box;
        .rank-top {
          position: relative;
          img {
            width: 200px;
            height: 200px;
            border-radius: 10px;
          }
          p {
            position: absolute;
            bottom: 10px;
            left: 10px;
            color: #fff;
            @include font_size($font_medium_s);
          }
        }
        .rank-bottom {
          width: 200px;
          @include no_wrap;
          p {
            padding: 10px 0 2px 0;
            @include font_size($font_medium_s);
            @include font_color();
          }
        }
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
}
</style>