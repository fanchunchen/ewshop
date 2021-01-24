<!--  -->
<template>
  <div class="goods-list-item">
    <img class="img" @load="imgLoad" v-lazy="product.cover_url" alt="" />
    <p>{{ product.title }}</p>
    <span class="price">¥{{ product.price }}</span
    ><span class="star">{{ product.collects_count }}</span>
    <img class="collect" src="@/assets/img/collect.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    product: {
      type: Object,
      default() {
        return {
          isLoad: false
        };
      }
    }
  },
  data() {
    return {};
  },
  created() {
    // console.log(this.product);
  },
  methods: {
    imgLoad() {
      if (!this.isLoad) {
        this.$bus.$emit("imgLoad");
        this.isLoad = true;
      }
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
.goods-list-item {
  text-align: center;
  font-size: 14px;
  .img {
    width: 100%;
    display: block;
  }
  span {
    display: inline-block;
    margin-top: 5px;
  }
  .price {
    color: red;
    margin-right: 15px;
  }
  .collect {
    width: 12px;
    position: relative;
    top: 0;
    left: -20px;
  }
}
</style>
