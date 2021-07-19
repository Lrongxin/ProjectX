<template>
  <div class="recommend">
    <div class="recommend-warpper">
      <ScrollView>
        <div>
          <Banner :banners="banners"></Banner>
          <Personalized
            :personalized="personalized"
            :title="'推荐歌单'"
            @select="fatherSelectItem"
            :type="'personalized'"
          ></Personalized>
          <Personalized
            :personalized="albums"
            :title="'最新专辑'"
            @select="fatherSelectItem"
            :type="'albums'"
          ></Personalized>
          <SongList :songs="songs"></SongList>
        </div>
      </ScrollView>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import {
  getBanner,
  getPersonalized,
  getNewAlbum,
  getNewSong,
} from "../api/index";
import Banner from "../components/Recommend/Banner";
import Personalized from "../components/Recommend/Personalized";
import SongList from "../components/Recommend/SongList";
import ScrollView from "../components/ScrollView";

export default {
  name: "Recommend",
  components: {
    Banner,
    Personalized,
    SongList,
    ScrollView,
  },
  data: function () {
    return {
      banners: [],
      personalized: [],
      albums: [],
      songs: [],
    };
  },
  created() {
    getBanner()
      .then((data) => {
        // console.log(data.banners);
        this.banners = data.banners;
        // console.log(this.banners);
      })
      .catch(function (err) {
        console.log(err);
      });
    getPersonalized()
      .then((data) => {
        // console.log(data);
        this.personalized = data.result;
        // console.log(this.banners);
      })
      .catch(function (err) {
        console.log(err);
      });
    getNewAlbum()
      .then((data) => {
        // console.log(data.albums.splice(0, 6));
        this.albums = data.albums.splice(0, 6);
        // console.log(this.banners);
      })
      .catch(function (err) {
        console.log(err);
      });
    getNewSong()
      .then((data) => {
        // console.log(data);
        // console.log(this.banners);
        let list = [];
        data.result.forEach((value) => {
          let obj = {};
          obj.id = value.id;
          obj.name = value.name;
          obj.picUrl = value.song.album.picUrl;
          let singer = "";
          for (let i = 0; i < value.song["artists"].length; i++) {
            if (i === 0) {
              singer = value.song["artists"][i].name;
            } else {
              singer += "-" + value.song["artists"][i].name;
            }
          }
          obj.singer = singer;
          list.push(obj);
        });
        this.songs = list;
      })
      .catch(function (err) {
        console.log(err);
      });
  },
  methods: {
    fatherSelectItem(id, type) {
      this.$router.push({
        path: `/recommend/detail/${id}/${type}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.recommend {
  position: fixed;
  top: 184px;
  right: 0;
  bottom: 0;
  left: 0;
  // overflow: hidden;
  .recommend-warpper {
    width: 100%;
    height: 100%;
    overflow: hidden;
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