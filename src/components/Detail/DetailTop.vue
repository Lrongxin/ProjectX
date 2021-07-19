<template>
  <div class="detail-top">
    <div class="img-container">
      <img :src="path" alt="" />
      <div class="mask" ref="mask"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailTop",
  props: {
    path: {
      type: String,
      default: "",
      require: true,
    },
  },
  methods: {
    changeMask(opacity) {
      this.$refs.mask.style.opacity = opacity;
    },
  },
};
</script>

<style lang="scss" scoped>
.img-container {
  width: 100%;
  height: 500px;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
  }
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #000;
    opacity: 0;
  }
}
</style>