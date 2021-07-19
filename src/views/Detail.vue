<template>
  <div class="detail">
    <DetailHeader :title="playlist.name"></DetailHeader>
    <DetailTop :path="playlist.coverImgUrl" ref="top"></DetailTop>
    <div class="bottom">
      <ScrollView ref="scrollview">
        <DetailBottom :playlist="playlist.tracks"></DetailBottom>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import DetailHeader from "../components/Detail/DetailHeader";
import DetailTop from "../components/Detail/DetailTop";
import DetailBottom from "../components/Detail/DetailBottom";
import ScrollView from "../components/ScrollView";
import { getPlayList, getAlbum, getArtistsSongs } from "../api/index";
export default {
  name: "Detail",
  components: {
    DetailHeader,
    DetailTop,
    DetailBottom,
    ScrollView,
  },
  data: function () {
    return {
      playlist: {},
    };
  },
  created() {
    // console.log(this.$route.params.type);
    if (this.$route.params.type == "personalized") {
      getPlayList({ id: this.$route.params.id })
        .then((data) => {
          // console.log(data);
          this.playlist = data.playlist;
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.$route.params.type == "albums") {
      getAlbum({ id: this.$route.params.id })
        .then((data) => {
          // console.log(data);
          this.playlist = {
            name: data.album.name,
            coverImgUrl: data.album.picUrl,
            tracks: data.songs,
          };
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.$route.params.type == "singer") {
      getArtistsSongs({ id: this.$route.params.id })
        .then((data) => {
          // console.log(data);
          this.playlist = {
            name: data.artist.name,
            coverImgUrl: data.artist.picUrl,
            tracks: data.hotSongs,
          };
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.$route.params.type == "rank") {
      getPlayList({ id: this.$route.params.id })
        .then((data) => {
          // console.log(data);
          this.playlist = {
            name: data.playlist.name,
            coverImgUrl: data.playlist.coverImgUrl,
            tracks: data.playlist.tracks,
          };
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  mounted() {
    let defaultHeight = this.$refs.top.$el.offsetHeight;
    this.$refs.scrollview.scrolling((offsetY) => {
      // console.log(offsetY);
      if (offsetY < 0) {
        // console.log("向上滚动");
        // let scale = (20 * Math.abs(offsetY)) / defaultHeight;
        // this.$refs.top.$el.style.filter = `blur(${scale}px)`;
        let scale = Math.abs(offsetY) / defaultHeight;
        this.$refs.top.changeMask(scale);
      } else {
        //transform: scale>1是放大效果
        let scale = 1 + offsetY / defaultHeight;
        this.$refs.top.$el.style.transform = `scale(${scale})`;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/mixin";
.detail {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  //   background-color: pink;
  @include bg_sub_color();
  .bottom {
    position: fixed;
    top: 500px;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
</style>