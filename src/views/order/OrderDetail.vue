<!--  -->
<template>
  <div class="order-detail">
    <nav-bar>
      <template v-slot:default>订单详情 </template>
    </nav-bar>
    <div class="order">
      <p>订单状态: {{ status }}</p>
      <p>订单编号: {{ detail.order_no }}</p>
      <p>下单时间: {{ detail.created_at }}</p>
      <van-button
        v-show="detail.status == 1"
        color="#1baeae"
        size="large"
        @click="goPay"
        >去支付</van-button
      >
      <van-button v-show="detail.status == 2" type="default" size="large"
        >确认订单</van-button
      >
      <div class="price">商品金额: ¥ {{ detail.amount + "." + "00" }}</div>
      <div class="send">配送方式:普通快递</div>
      <van-card
        v-for="item in detail.orderDetails.data"
        :key="item.id"
        :num="item.num"
        :price="item.price"
        desc="全场包邮"
        :title="item.goods.title"
        :thumb="item.goods.cover_url"
      />
      <van-popup
        :close-on-click-overlay="false"
        closeable
        v-model="show"
        position="bottom"
        style="height:30%"
        @close="popupClose"
      >
        <van-grid :column-num="2">
          <van-grid-item>
            支付宝支付
            <van-image :src="aliyun"></van-image>
          </van-grid-item>
          <!-- <van-grid-item>
          微信支付
          <van-image src=""></van-image>
        </van-grid-item> -->
        </van-grid>
      </van-popup>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import { getOrderDetail, payOrder, orderStatus } from "@/request/order";
export default {
  name: "OrderDetail",
  data() {
    return {
      detail: {
        orderDetails: {
          data: []
        }
      },
      show: false,
      aliyun: "",
      wechat: ""
    };
  },
  created() {
    getOrderDetail(
      this.$route.query.id,
      "?include=user,orderDetails.goods"
    ).then(res => {
      console.log(res);
      this.detail = res;
    });
  },
  methods: {
    goPay() {
      this.show = true;
      payOrder(this.$route.query.id, "?type=aliyun").then(res => {
        // console.log(res);
        this.aliyun = res.qr_code_url;
      });
      // payOrder(this.id, "?type=wechat").then(res => {
      // console.log(res);
      //   this.wechat = res.qr_code_url;
      // });
      const timer = setInterval(() => {
        orderStatus(this.$route.query.id).then(res => {
          if (res == 2) {
            clearInterval(timer);
            this.$router.push({
              path: "/orderdetail",
              query: {
                id: this.id,
                status: 2
              }
            });
          }
        });
      }, 2000);
    },
    popupClose() {
      // console.log(1);
      this.$router.push({
        path: "/orderDetail",
        query: {
          id: this.id
        }
      });
    }
  },
  computed: {
    status() {
      if (this.detail.status == 1) {
        return "已下单";
      } else if (this.detail.status == 2) {
        return "已支付";
      } else if (this.detail.status == 3) {
        return "等待发货";
      } else if (this.detail.status == 4) {
        return "确认收货";
      } else {
        return "已过期";
      }
    }
  },
  components: { NavBar }
};
</script>
<style lang="less" scoped>
.order-detail {
  .order {
    margin-top: 45px;
    padding: 20px;
    p {
      line-height: 20px;
    }
    .van-button {
      margin-top: 10px;
    }
  }
  .price {
    margin-top: 50px;
  }
  .send {
    margin-top: 10px;
  }
}
</style>
