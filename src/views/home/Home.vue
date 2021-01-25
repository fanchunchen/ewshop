<template>
  <div class="home">
    <nav-bar>
      <template v-slot:left></template>
      <template v-slot:default> </template>
    </nav-bar>
    <scroll
      ref="scroll"
      class="content"
      @scroll="homeScroll"
      @pullingUp="loadMore"
      :pull-up-load="true"
    >
      <div>
        <home-swiper :banner="banner"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <tab-control :titles="titles" @tabClick="tabClick"></tab-control>
        <goods-list :goods="goodsData[currentType].list"></goods-list>
      </div>
    </scroll>
    <back-top v-show="isShowBackTop" @topClick="topClick"></back-top>
  </div>
</template>

<script>
// @ is an alias to /src

import NavBar from "@/components/common/navbar/NavBar";
import Scroll from "@/components/common/scroll/Scroll";
import TabControl from "@/components/content/tabcontrol/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/content/backtop/BackTop";

import HomeSwiper from "./ChildComps/HomeSwiper";
import RecommendView from "./ChildComps/RecommendView";

import { getHomeData, getHomeGoods } from "@/request/home";
export default {
  name: "Home",
  data() {
    return {
      banner: [],
      categories: [],
      goods: {},
      recommends: [],
      titles: ["畅销", "新书", "精选"],
      currentType: "sales",
      goodsData: {
        sales: { page: 0, list: [] },
        new: { page: 0, list: [] },
        recommend: { page: 0, list: [] }
      },
      isShowBackTop: false,
      saveY: ""
    };
  },
  created() {
    getHomeData().then(res => {
      // console.log(res);
      let { categories, goods, slides } = res;
      this.categories = categories;
      this.goods = goods;
      this.banner = slides;
      this.recommends = goods.data;
      // console.log(this.categories);
      // console.log(this.banner);
      // console.log(this.goods);
      // console.log(this.recommends);
      // });
    });
    this._getHomeGoods("sales");
    this._getHomeGoods("new");
    this._getHomeGoods("recommend");
    this.$bus.$on("imgLoad", () => {
      // console.log(1);
      this.$refs.scroll.refresh();
    });
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY);
  },
  deactivated() {
    // console.log(this.saveY);
  },
  methods: {
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "sales";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "recommend";
          break;
      }
      this.$refs.scroll.refresh()
    },
    _getHomeGoods(type) {
      let page = this.goodsData[type].page + 1;
      getHomeGoods(type, page)
        .then(res => {
          // console.log(res);
          this.goodsData[type].list.push(...res.goods.data);
          this.goodsData[type].page += 1;
          this.$refs.scroll.finishPullUp();
        })
        .catch(err => {
          console.log(err);
        });
    },
    homeScroll(position) {
      this.isShowBackTop = -position.y > 1000;
      this.saveY = -position.y;
    },
    loadMore() {
      // console.log(1);
      this._getHomeGoods(this.currentType);
    },
    topClick() {
      // console.log(1);
      this.$refs.scroll.scrollTo(0, 0, 300);
    }
  },
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,

    HomeSwiper,
    RecommendView
  }
};
</script>
<style lang="less" scoped>
.home {
  height: 100vh;
  position: relative;
  .content {
    overflow: hidden;
    position: absolute;
    top: 45px;
    bottom: 50px;
    left: 0;
    right: 0;
  }
}
</style>
