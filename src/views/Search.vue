<template>
  <div class="search">
    <div class="search-box">
      <img
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg=="
        alt=""
      />
      <input
        type="text"
        placeholder="搜索歌曲、歌手、专辑"
        v-model="keywords"
        v-throttle="search"
      />
    </div>
    <div class="search-suggest" v-show="keywords !== ''">
      <ScrollView>
        <ul>
          <li
            v-for="value in songs"
            :key="value.id"
            @click="selectMusic(value.id)"
          >
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg=="
              alt=""
            />
            <p>{{ value.name }} - {{ value.artists[0].name }}</p>
          </li>
        </ul>
      </ScrollView>
    </div>
    <div class="search-hot">
      <h3>热门搜索</h3>
      <ul>
        <li
          v-for="value in hots"
          :key="value.first"
          @click.stop="selectedHot(value.first)"
        >
          {{ value.first }}
        </li>
      </ul>
    </div>
    <ul class="search-history">
      <li v-for="value in searchHistory" :key="value">
        <div class="history-left">
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJNMTUgMzBDNi43MTYgMzAgMCAyMy4yODQgMCAxNVM2LjcxNiAwIDE1IDBzMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOEM3LjgyIDIgMiA3LjgyIDIgMTVzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzUzIyLjE4IDIgMTUgMm03IDE2aC04YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAxIDEgMiAwdjloN2ExIDEgMCAxIDEgMCAyIi8+PC9zdmc+"
            alt=""
          />
          <p>{{ value }}</p>
        </div>
        <div class="history-right">
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4="
            alt=""
            @click="delHistory(value)"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ScrollView from "../components/ScrollView";
import { getSearchList, getSearcHot } from "../api/index";
import { mapActions } from "vuex";
import { setLocalStorage, getLocalStorage } from "../tools/tools";

export default {
  name: "Search",
  components: {
    ScrollView,
  },
  data() {
    return {
      keywords: "",
      songs: [],
      hots: [],
      searchHistory: [],
    };
  },
  created() {
    getSearcHot()
      .then((data) => {
        // console.log(data);
        this.hots = data.result.hots;
      })
      .catch(function (err) {
        console.log(err);
      });
    if (
      getLocalStorage("searchHistory") === undefined ||
      getLocalStorage("searchHistory") === null
    ) {
      return;
    }
    this.searchHistory = getLocalStorage("searchHistory");
  },
  methods: {
    ...mapActions(["setFullScreen", "setSongDetail"]),
    selectMusic(id) {
      this.setFullScreen(true);
      this.setSongDetail([id]);

      if (this.searchHistory.includes(this.keywords)) {
        return;
      }
      this.searchHistory.push(this.keywords);
      setLocalStorage("searchHistory", this.searchHistory);
      this.keywords = "";
    },
    search() {
      // console.log("发送请求");
      getSearchList({ keywords: this.keywords })
        .then((data) => {
          // console.log(data);
          this.songs = data.result.songs;
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    selectedHot(name) {
      this.keywords = name;
      this.search();
    },
    delHistory(name) {
      this.searchHistory = this.searchHistory.filter(function (item) {
        return item !== name;
      });
      setLocalStorage("searchHistory", this.searchHistory);
    },
  },
  directives: {
    throttle: {
      // 指令的定义
      //节流阀 提高性能
      inserted: function (el, obj) {
        let timerId = null;
        let flag = true;
        el.addEventListener("input", function () {
          if (!flag) return;
          flag = false;
          timerId && clearTimeout(timerId);
          timerId = setTimeout(function () {
            flag = true;
            obj.value();
          }, 1000);
        });
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/variable";
@import "../assets/css/mixin";
.search {
  position: fixed;
  top: 184px;
  right: 0;
  bottom: 0;
  left: 0;
  @include bg_sub_color();
  .search-box {
    display: flex;
    align-items: center;
    margin: 40px 20px;
    background: #ebebec;
    border-radius: 30px;
    border-bottom: 1px solid #ccc;
    img {
      width: 40px;
      height: 40px;
      margin-left: 20px;
    }
    input {
      border: none;
      outline: none;
      background: transparent;
      @include font_size($font_medium);
      height: 60px;
      margin-left: 20px;
    }
  }
  .search-suggest {
    position: fixed;
    top: 300px;
    right: 0;
    left: 0;
    bottom: 0;
    overflow: hidden;
    @include bg_sub_color();
    li {
      display: flex;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      img {
        width: 40px;
        height: 40px;
      }
      p {
        margin-left: 20px;
        @include font_color();
        @include font_size($font_medium);
      }
    }
  }
  .search-hot {
    h3 {
      @include font_color();
      @include font_size($font_medium);
      padding: 10px 20px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        height: 60px;
        line-height: 60px;
        border: 1px solid #ccc;
        border-radius: 30px;
        @include font_color();
        @include font_size($font_medium_s);
        margin: 10px 20px;
        padding: 0 30px;
      }
    }
  }
  .search-history {
    margin-top: 20px;
    li {
      padding: 20px 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      .history-left {
        display: flex;
        align-items: center;
        img {
          width: 40px;
          height: 40px;
        }
        p {
          margin-left: 20px;
          @include font_color();
          @include font_size($font_medium_s);
        }
      }
      .history-right {
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}
</style>