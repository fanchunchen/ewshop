<!--  -->
<template>
  <div class="back-top" @click="topClick">
    <img class="img" src="@/assets/img/top.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "BackTop",
  data() {
    return {};
  },
  methods: {
    topClick() {
      this.$emit("topClick");
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
.back-top {
  position: fixed;
  right: 10px;
  bottom: 60px;
  .img {
    height: 48px;
  }
}
</style>
