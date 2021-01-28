<!--  -->
<template>
  <div class="create">
    <nav-bar>
      <template v-slot:default>订单预览 </template>
    </nav-bar>
    <div class="user" @click="addressClick">
      <div class="info">
        <span>{{ info.name }} </span><span>{{ info.tel }}</span>
        <p>{{ info.address }}</p>
      </div>
      <van-icon name="arrow" />
    </div>
    <van-card
      v-for="item in carts"
      :key="item.id"
      :num="item.num"
      :price="item.goods.price"
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
    <div class="price">商品金额</div>
    <van-submit-bar
      :price="totalPrice * 100"
      button-text="生成订单"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import {
  getOrderPreview,
  commitOrder,
  payOrder,
  orderStatus
} from "@/request/order";
export default {
  name: "CreatOrder",
  data() {
    return {
      carts: [],
      info: {},
      show: false,
      id: "",
      aliyun: "",
      wechat: ""
    };
  },
  created() {
    getOrderPreview().then(res => {
      // console.log(res);
      this.carts = res.carts;
      // console.log(this.carts);
      res.address.map(item => {
        if (item.is_default == 1) {
          this.info = {
            id: item.id,
            name: item.name,
            tel: item.phone,
            address: `${item.province}${item.city}${item.county}${item.address}`
          };
        }
      });
    });
  },
  methods: {
    onSubmit() {
      commitOrder(this.info.id).then(res => {
        // console.log(res);
        this.id = res.id;
        this.$toast("创建订单成功");
        this.$store.dispatch("addCart");
        this.show = true;
        payOrder(this.id, "?type=aliyun").then(res => {
          // console.log(res);
          this.aliyun = res.qr_code_url;
        });
        // payOrder(this.id, "?type=wechat").then(res => {
        // console.log(res);
        //   this.wechat = res.qr_code_url;
        // });
        const timer = setInterval(() => {
          orderStatus(this.id).then(res => {
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
      });
    },
    addressClick() {
      this.$router.push("/address");
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
    totalPrice() {
      return this.carts.reduce((pre, item) => {
        return pre + item.num * item.goods.price;
      }, 0);
    }
  },
  components: { NavBar }
};
</script>
<style lang="less" scoped>
.create {
  font-size: 14px;
  height: 100%;
  .user {
    position: relative;
    margin-top: 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    .info {
      p {
        margin-top: 10px;
      }
    }
  }
  .user::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: repeating-linear-gradient(
      -45deg,
      #ff6c6c 0,
      #ff6c6c 20%,
      transparent 0,
      transparent 25%,
      #1989fa 0,
      #1989fa 45%,
      transparent 0,
      transparent 50%
    );
    background-size: 80px;
  }
  .van-submit-bar {
    bottom: 50px;
  }
  .price {
    position: absolute;
    bottom: 65px;
    left: 10px;
    font-size: 14px;
    z-index: 999;
  }
}
/deep/.van-popup {
  bottom: 50px;
  padding: 50px 20px;

  box-sizing: border-box;
}
</style>
