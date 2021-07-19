<template>
  <Header class="header">
    <div slot="left" class="header-left" @click.stop="back"></div>
    <p slot="center" class="header-title">{{ title }}</p>
    <div slot="right" class="header-right"></div>
  </Header>
</template>

<script>
import Header from "../Header";
export default {
  name: "DetailHeader",
  components: {
    Header,
  },
  methods: {
    back() {
      window.history.back();
    },
  },
  props: {
    title: {
      type: String,
      default: "",
      require: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixin";
@import "../../assets/css/variable";
.header {
  .header-left {
    @include bg_img("../../assets/images/back");
  }
  .header-right {
    @include bg_img("../../assets/images/more");
  }
  .header-title {
    width: 60%;
    text-align: center;
    line-height: 100px;
    color: #fff;
    font-weight: bold;
    @include font_size($font_medium);
    @include no-wrap();
  }
}
</style>