<template>
  <div id="app">
    <keep-alive exclude="Detail"><router-view></router-view></keep-alive>
    <tab-bar></tab-bar>
  </div>
</template>
<script>
import TabBar from "@/components/common/tabbar/TabBar";
export default {
  created() {},
  mounted() {
    this.$store.dispatch("addCart");
  },
  components: { TabBar }
};
</script>
<style lang="less">
// @import '../src/assets/css/base.css';
</style>
