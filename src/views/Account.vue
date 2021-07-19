<template>
  <transition appear>
    <div class="account">
      <AccountHeader @switchItem="switchItem"></AccountHeader>
      <AccountBottom :switchNum="switchNum"></AccountBottom>
    </div>
  </transition>
</template>

<script>
import AccountHeader from "../components/Account/AccountHeader";
import AccountBottom from "../components/Account/AccountBottom";
export default {
  name: "Account",
  components: {
    AccountHeader,
    AccountBottom,
  },
  data() {
    return {
      switchNum: 0,
    };
  },
  methods: {
    switchItem(num) {
      this.switchNum = num;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/mixin";
@import "../assets/css/variable";
.account {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  @include bg_sub_color();
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