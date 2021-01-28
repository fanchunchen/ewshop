<!--  -->
<template>
  <div class="address">
    <nav-bar>
      <template v-slot:default> 地址管理</template>
    </nav-bar>
    <div class="place" style="margin-top:45px" v-show="list.length == 0">
      还没有设置地址
    </div>
    <van-address-list
      style="margin-top:45px"
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"

    />
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import { getAddressData } from "@/request/address";
export default {
  name: "Address",
  data() {
    return {
      chosenAddressId: "",
      list: []
    };
  },
  created() {
    getAddressData().then(res => {
      // console.log(res);
      this.list = res.data.map(item => {
        return {
          id: item.id,
          name: item.name,
          tel: item.phone,
          address: `${item.province}${item.city}${item.county}${item.address}`,
          isDefault: item.is_default == 0 ? false : true
        };
      });
      this.list.map(item => {
        if (item.isDefault) {
          this.chosenAddressId = item.id;
        } else {
          this.chosenAddressId = "";
        }
      });
    });
  },
  mounted() {
    // console.log(this.$route.query.item);
  },
  methods: {
    onAdd() {
      this.$router.push({
        path: "/editaddress",
        query: {
          type: "add"
        }
      });
    },
    onEdit(item,index) {
      // console.log(item,index);
      this.$router.push({
        path: "/editaddress",
        query: {
          type: "edit",
          addressId: item.id,
          index
        }
      });
    },

  },
  components: {
    NavBar
  }
};
</script>
<style lang="less" scoped>
.address {
  .place {
    text-align: center;
    line-height: 400px;
  }
  /deep/.van-address-item .van-radio__icon--checked .van-icon {
    background-color: #42b983;
    border: 1px solid #42b983;
  }
  .van-button {
    bottom: 100px;
    background-color: #42b983;
    border: 1px solid #42b983;
  }
}
</style>
