<!--  -->
<template>
  <div class="detail">
    <nav-bar>
      <template v-slot:default>图书详情 </template>
    </nav-bar>
    <div class="img">
      <img width="100%" style="display:block" :src="goods.cover_url" alt="" />
    </div>
    <van-card
      :num="goods.stock"
      :price="goods.price + '.' + '00'"
      :desc="goods.description"
      :title="goods.title"
    >
      <template #tags>
        <van-tag plain type="danger">新书</van-tag>
        <van-tag plain type="danger" v-show="goods.is_recommend == 1"
          >推荐</van-tag
        >
      </template>
      <template #footer>
        <van-button type="warning">加入购物车</van-button>
        <van-button type="danger">立刻购买</van-button>
      </template>
    </van-card>
    <tab-control @tabClick="tabClick" :titles="titles"></tab-control>
    <introduce :intro="goods" v-if="showBlock == 0"></introduce>
    <div v-else-if="showBlock == 1">
      <div v-for="(item, index) in comments" :key="index">{{ item }}</div>
    </div>
    <goods-list v-else :goods="like_goods"></goods-list>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import GoodsList from "@/components/content/goods/GoodsList";
import TabControl from "@/components/content/tabcontrol/TabControl";

import Introduce from "./ChildComps/Introduce";

import { getDetailData } from "@/request/detail";
export default {
  name: "Detail",
  data() {
    return {
      goods: {},
      like_goods: [],
      titles: ["概述", "热评", "相关图书"],
      showBlock: 0,
      comments: []
    };
  },
  created() {
    // console.log(this.$route.query.id);

    getDetailData(this.$route.query.id).then(res => {
      console.log(res);
      let { like_goods, goods } = res;
      this.goods = goods;
      this.like_goods = like_goods;
      // console.log(this.goods);
      // console.log(this.like_goods);
      this.comments = res.goods.comments;
    });
  },
  methods: {
    tabClick(index) {
      // console.log(index);
      this.showBlock = index;
    }
  },
  components: { NavBar, TabControl, GoodsList, Introduce }
};
</script>
<style lang="less" scoped>
.detail {
  .img {
    margin-top: 45px;
  }
}
</style>
