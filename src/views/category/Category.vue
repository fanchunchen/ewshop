<!--  -->
<template>
  <div class="category">
    <nav-bar>
      <template v-slot:default>图书分类 </template>
    </nav-bar>
    <div class="container">
      <div class="tab-menu">
        <van-sidebar v-model="active">
          <van-collapse v-model="activeName" accordion>
            <van-collapse-item
              v-for="(item, index) in categories"
              :key="index"
              :title="item.name"
              :name="item.name"
              ><van-sidebar-item
                v-for="(sub, i) in item.children"
                :key="i"
                :title="sub.name"
                @click="menuClick(sub.id)"
            /></van-collapse-item>
          </van-collapse>
        </van-sidebar>
      </div>
      <div class="right">
        <div class="sort">
          <van-tabs @click="tabClick" v-model="sort">
            <van-tab title="销量排序"></van-tab>
            <van-tab title="价格排序"></van-tab>
            <van-tab title="评化排序"></van-tab>
          </van-tabs>
        </div>
        <scroll
          ref="scroll"
          class="content"
          :pull-up-load="true"
          @pullingUp="loadMore"
        >
          <div class="goods">
            <van-card
              @click="goDetail(item.id)"
              v-for="item in goods[currentOrder].list"
              :key="item.id"
              :num="item.collects_count"
              tag="流行"
              :price="item.price"
              :title="item.title"
              :thumb="item.cover_url"
              :lazy-load="true"
            /></div
        ></scroll>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import Scroll from "@/components/common/scroll/Scroll";

import { getCategory, getCategoryGoods } from "@/request/category";

export default {
  name: "Category",
  data() {
    return {
      active: 0,
      activeName: "",
      sort: 0,
      currentOrder: "sales",
      cid: 0,
      categories: [],
      goods: {
        sales: {
          page: 1,
          list: []
        },
        price: {
          page: 1,
          list: []
        },
        comments_count: {
          page: 1,
          list: []
        }
      }
    };
  },
  created() {
    getCategory().then(res => {
      // console.log(res);
      let { categories } = res;
      this.categories = categories;
      // console.log(this.categories);
    });
    this.totalFn();
  },

  methods: {
    menuClick(id) {
      // console.log(id);
      this.cid = id;
      this.totalFn();
    },
    tabClick(index) {
      // console.log(index);

      switch (index) {
        case 0:
          this.currentOrder = "sales";
          break;
        case 1:
          this.currentOrder = "price";
          break;
        case 2:
          this.currentOrder = "comments_count";
          break;
      }
      this.$refs.scroll.refresh();
    },
    totalFn() {
      getCategoryGoods(this.cid, 1, "sales").then(res => {
        // console.log(res);
        this.goods["sales"].list = res.goods.data;
      });
      getCategoryGoods(this.cid, 1, "price").then(res => {
        this.goods["price"].list = res.goods.data;
      });
      getCategoryGoods(this.cid, 1, "comments_count").then(res => {
        this.goods["comments_count"].list = res.goods.data;
      });
    },
    loadMore() {
      let page = this.goods[this.currentOrder].page + 1;
      getCategoryGoods(this.cid, page, this.currentOrder).then(res => {
        // console.log(res);
        this.goods[this.currentOrder].list.push(...res.goods.data);
        this.goods[this.currentOrder].page += 1;
        this.$refs.scroll.finishPullUp();
        this.$refs.scroll.refresh();
      });
    },
    goDetail(id) {
      this.$router.push({ path: "/detail", query: { id } });
    }
  },
  components: { NavBar, Scroll }
};
</script>
<style lang="less" scoped>
.category {
  height: 100vh;
  .container {
    margin-top: 45px;
    height: calc(100% - 95px);
    display: flex;
    .tab-menu {
      padding-left: 10px;

      padding-top: 44px;
      width: 130px;

      .van-sidebar {
        width: 110px;
      }
    }
    .right {
      flex: 1;
      .content {
        height: 100%;
        overflow: hidden;
      }
    }
  }
}
</style>
