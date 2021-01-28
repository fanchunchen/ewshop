<!--  -->
<template>
  <div class="tab-bar">
    <van-tabbar route v-model="active" active-color="red">
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/category">分类</van-tabbar-item>

      <van-tabbar-item :badge="num" icon="cart-o" to="/cart"
        >购物车</van-tabbar-item
      >

      <van-tabbar-item icon="user-o" to="/profile">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  data() {
    return { active: 0 };
  },
  computed: {
    num() {
      return this.$store.state.cartNum;
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
.tab-bar {
  .van-tabbar {
    z-index: 9999;
  }
}
</style>
