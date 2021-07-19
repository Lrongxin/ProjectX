<template>
  <div id="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import IScroll from "iscroll/build/iscroll-probe";
export default {
  name: "ScrollView",
  mounted() {
    this.iscroll = new IScroll(this.$refs.wrapper, {
      mouseWheel: true,
      scrollbars: false,
      //监听滚动的等级，数字越大监听的越仔细
      probeType: 3,
      //解决拖拽卡顿问题
      scrollX: false,
      scrollY: true,
      disableTouch: false,
      disableMouse: true,
    });
    // setTimeout(() => {
    //   console.log(this.iscroll.maxScrollY);
    //   this.iscroll.refresh();
    //   console.log(this.iscroll.maxScrollY);
    // }, 5000);
    //实例化MutationObserver对象，第一个参数为变化记录数组，第二个参数是观察者对象本身
    let observer = new MutationObserver((mutationList, observer) => {
      // console.log(this.iscroll.maxScrollY);
      this.iscroll.refresh();
      // console.log(this.iscroll.maxScrollY);
    });
    let config = {
      childList: true,
      subtree: true,
      attributeFilter: ["height", "offsetHeight"],
    };
    //在观察者对象上注册需要观察的dom节点以及相应的参数
    observer.observe(this.$refs.wrapper, config);
  },
  methods: {
    //提供一个监听滚动偏移位的方法给外界使用
    scrolling(fn) {
      this.iscroll.on("scroll", function () {
        fn(this.y);
      });
    },
    refresh() {
      setTimeout(() => {
        this.iscroll.refresh();
      }, 100);
    },
    scrollTo(x, y, time) {
      this.iscroll.scrollTo(x, y, time);
    },
  },
};
</script>

<style lang="scss" scoped>
#wrapper {
  width: 100%;
  height: 100%;
}
</style>