<template>
  <div id="app">
    <MainHeader></MainHeader>
    <Tabbar></Tabbar>
    <keep-alive include="Singer, Search">
      <router-view></router-view>
    </keep-alive>
    <Player></Player>
  </div>
</template>

<script>
import MainHeader from "./components/MainHeader";
import Tabbar from "./components/Tabbar";
import Player from "./views/Player";
export default {
  name: "App",
  components: {
    MainHeader,
    Tabbar,
    Player,
  },
};
</script>

<style lang="scss">
</style>
