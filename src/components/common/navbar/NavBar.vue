<!--  -->
<template>
  <div class="nav-bar">
    <div class="left" @click="goBack">
      <slot name="left"><img src="@/assets/img/left.png" alt=""/></slot>
    </div>
    <div class="center"><slot>图书兄弟</slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.back();
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
.nav-bar {
  background-color: #42b983;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
  display: flex;
  line-height: 45px;
  height: 45px;
  text-align: center;
  .left,
  .right {
    width: 60px;
  }
  .left {
    img {
      width: 24px;
      margin-top: 10px;
    }
  }
  .center {
    flex: 1;
    color: #fff;
    font-weight: 600;
  }
}
</style>
