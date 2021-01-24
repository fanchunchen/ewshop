<!--  -->
<template>
  <div class="goods-list">
    <goods-list-item
      class="item"
      v-for="(item, index) in goods"
      :key="index"
      :product="item"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue";
export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  data() {
    return {};
  },

  components: { GoodsListItem }
};
</script>
<style lang="less" scoped>
.goods-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .item {
    width: 48%;
  }
}
</style>
