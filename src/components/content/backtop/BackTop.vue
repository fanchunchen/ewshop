<!--  -->
<template>
  <div class="back-top" @click="topClick">
    <img src="@/assets/img/top.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "BackTop",
  data() {
    return {};
  },
methods:{topClick(){
  this.$emit('topClick')
}},
  components: {}
};
</script>
<style lang="less" scoped>
.back-top {
  img {
    height: 48px;
    position: fixed;
    right: 10px;
    bottom: 60px;
  }
}
</style>
