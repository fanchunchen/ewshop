<!--  -->
<template>
  <div class="order">
    <nav-bar>
      <template v-slot:default> 订单列表</template>
    </nav-bar>
    <van-tabs @click="tabClick" v-model="active">
      <van-tab title="全部">
        <div class="info" v-for="item in orderList" :key="item.id">
          <div>订单号:{{ item.order_no }}</div>
          <div>创建时间:{{ item.created_at }}</div>
          <van-card
            v-for="sub in item.orderDetails.data"
            :key="item.id"
            :num="sub.num"
            :price="sub.goods.price"
            desc="全场包邮"
            :title="sub.goods.title"
            :thumb="sub.goods.cover_url"
          />
        </div>
      </van-tab>
      <van-tab title="待付款">
        <div class="info" v-for="item in orderList" :key="item.id">
          <div>订单号:{{ item.order_no }}</div>
          <div>创建时间:{{ item.created_at }}</div>
          <van-card
            v-for="sub in item.orderDetails.data"
            :key="item.id"
            :num="sub.num"
            :price="sub.goods.price"
            desc="全场包邮"
            :title="sub.goods.title"
            :thumb="sub.goods.cover_url"
          /></div
      ></van-tab>
      <van-tab title="已支付">
        <div class="info" v-for="item in orderList" :key="item.id">
          <div>订单号:{{ item.order_no }}</div>
          <div>创建时间:{{ item.created_at }}</div>
          <van-card
            v-for="sub in item.orderDetails.data"
            :key="item.id"
            :num="sub.num"
            :price="sub.goods.price"
            desc="全场包邮"
            :title="sub.goods.title"
            :thumb="sub.goods.cover_url"
          /></div
      ></van-tab>
      <van-tab title="发货">
        <div class="info" v-for="item in orderList" :key="item.id">
          <div>订单号:{{ item.order_no }}</div>
          <div>创建时间:{{ item.created_at }}</div>
          <van-card
            v-for="sub in item.orderDetails.data"
            :key="item.id"
            :num="sub.num"
            :price="sub.goods.price"
            desc="全场包邮"
            :title="sub.goods.title"
            :thumb="sub.goods.cover_url"
          /></div
      ></van-tab>
      <van-tab title="交易完成">
        <div class="info" v-for="item in orderList" :key="item.id">
          <div>订单号:{{ item.order_no }}</div>
          <div>创建时间:{{ item.created_at }}</div>
          <van-card
            v-for="sub in item.orderDetails.data"
            :key="item.id"
            :num="sub.num"
            :price="sub.goods.price"
            desc="全场包邮"
            :title="sub.goods.title"
            :thumb="sub.goods.cover_url"
          /></div
      ></van-tab>
      <van-tab title="已过期">
        <div class="info" v-for="item in orderList" :key="item.id">
          <div>订单号:{{ item.order_no }}</div>
          <div>创建时间:{{ item.created_at }}</div>
          <van-card
            v-for="sub in item.orderDetails.data"
            :key="item.id"
            :num="sub.num"
            :price="sub.goods.price"
            desc="全场包邮"
            :title="sub.goods.title"
            :thumb="sub.goods.cover_url"
          /></div
      ></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import { getOrderList } from "@/request/order";
export default {
  name: "Order",
  data() {
    return {
      active: 0,
      page: 1,
      status: 0,
      include: "orderDetails.goods",
      orderList: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      getOrderList({
        page: this.page,
        status: this.status,
        include: this.include,
      }).then((res) => {
        // console.log(res);
        this.orderList = res.data;
        console.log(this.orderList);
      });
    },
    tabClick(index) {
      // console.log(index);
      this.status = index;
      this.init();
    },
  },
  components: { NavBar },
};
</script>
<style lang="less" scoped>
.order {
  .van-tabs {
    margin-top: 45px;
    .van-tab__pane {
      padding: 20px;
      .info {
        border-bottom: 1px solid #ccc;
        div {
          line-height: 30px;
        }
      }
    }
  }
}
</style>
