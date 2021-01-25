<!--  -->
<template>
  <div class="cart">
    <nav-bar>
      <template v-slot:default>购物车({{ cartNum }}) </template>
    </nav-bar>
    <van-checkbox-group style="margin-top:45px" v-model="result">
      <van-checkbox
        @click="chxClick(item)"
        v-for="item in cartList"
        :key="item.id"
        class="chx"
        :name="item.id"
      >
        <van-swipe-cell>
          <van-card
            :num="item.goods.stock"
            :price="item.goods.price"
            :title="item.goods.title"
            :thumb="item.goods.cover_url"
          />
          <template #right>
            <van-button
              @click="deleteGoods(item)"
              square
              text="删除"
              type="danger"
              class="delete-button"
            />
          </template>
          <van-stepper @change="stepChange(item)" v-model="item.num" />
        </van-swipe-cell>
      </van-checkbox>
    </van-checkbox-group>
    <van-submit-bar
      :price="totalPrice * 100"
      button-text="结算"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checkedAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

import { cartList, isChecked, cartChange, deleteCart } from "@/request/cart";

import { mapState } from "vuex";
export default {
  name: "Cart",
  computed: {
    ...mapState(["cartNum"]),
    checkedAll: {
      get() {
        if (this.cartList.length == 0) return false;
        return this.result.length == this.cartList.length ? true : false;
      },
      set(val) {
        // console.log(val);
        let results = val ? 1 : 0;
        this.result = [];
        this.cartList.map(item => {
          item.is_checked = results;
          if (item.is_checked == 1) {
            this.result.push(item.id);
          }
          isChecked(this.result).then(res => {
            // console.log(res);
          });
        });
      }
    },
    totalPrice() {
      return this.cartList
        .filter(item => item.is_checked == 1)
        .reduce((prev, item) => {
          return prev + item.goods.price * item.num;
        }, 0);
    }
  },
  data() {
    return {
      result: [],
      cartList: [],
      checked: true
    };
  },
  created() {
    this.$toast.loading({
      message: "加载中...",
      forbidClick: true
    });

    cartList("include=goods").then(res => {
      // console.log(res);
      this.cartList = res.data;
      // console.log(this.cartList);
      this.cartList.map(item => {
        if (item.is_checked == 1) {
          this.result.push(item.id);
        }
      });
    });
  },

  methods: {
    onSubmit() {},
    chxClick(item) {
      item.is_checked = item.is_checked == 1 ? 0 : 1;
      this.result = [];
      this.cartList.map(item => {
        if (item.is_checked == 1) {
          this.result.push(item.id);
        }
      });
      isChecked(this.result).then(res => {
        // console.log(res);
      });
    },
    stepChange(item) {
      // console.log(item);
      event.stopPropagation();
      cartChange(item.id, item.num).then(res => {
        // console.log(res);
      });
    },
    deleteGoods(item) {
      // console.log(item);
      deleteCart(item.id).then(res => {
        // console.log(res)
        this.$store.dispatch("addCart");
        cartList("include=goods").then(res => {
          // console.log(res);
          this.cartList = res.data;
          // console.log(this.cartList);
          this.cartList.map(item => {
            if (item.is_checked == 1) {
              this.result.push(item.id);
            }
          });
        });
      });
    }
  },
  components: { NavBar }
};
</script>
<style lang="less" scoped>
.cart {
  .van-checkbox-group {
    .chx {
      position: relative;
      padding: 5px 2%;
      border-bottom: 1px solid #ccc;
      /deep/.van-checkbox__label {
        width: 100%;
      }
      .van-stepper {
        position: absolute;
        right: 2%;
        bottom: 5px;
      }
      .van-button {
        height: 100%;
      }
      .van-card__num {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
  .van-submit-bar {
    bottom: 50px;
  }
}
</style>
