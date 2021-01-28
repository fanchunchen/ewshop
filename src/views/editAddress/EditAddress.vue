<!--  -->
<template>
  <div class="edit">
    <nav-bar>
      <template v-slot:default> {{ title }}</template>
    </nav-bar>
    <van-address-edit
      style="margin-top: 45px"
      :address-info="AddressInfo"
      :area-list="areaList"
      :show-delete="type === 'edit'"
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import store from "@/store";
import areaList from "@/utils/area";
import {
  addAddress,
  addressDetail,
  updateAddress,
  deleteAddress,
} from "@/request/address";
export default {
  name: "EditAddress",
  data() {
    return {
      areaList,
      searchResult: [],
      AddressInfo: {},
      type: "",
      addressId: "",
      areaCode: "",
    };
  },
  created() {
    this.type = this.$route.query.type;
    // console.log(this.areaList.county_list)
  },
  mounted() {
    if (this.type === "edit") {
      this.addressId = this.$route.query.addressId;
      addressDetail(this.addressId).then((res) => {
        for (let k in this.areaList.county_list) {
          if (this.areaList.county_list[k] == res.county) {
            this.areaCode = k;
          }
        }

        // console.log(res);
        this.AddressInfo = {
          name: res.name,
          tel: res.phone,
          province: res.province,
          city: res.city,
          areaCode: this.areaCode,
          county: res.county,
          addressDetail: res.address,
          isDefault: res.is_default == 0 ? false : true,
        };
      });
    }
  },
  computed: {
    title() {
      return this.type === "add" ? "新增地址" : "编辑地址";
    },
  },
  methods: {
    onSave(content) {
      // console.log(content);

      let data = {
        name: content.name,
        address: content.addressDetail,
        phone: content.tel,
        province: content.province,
        city: content.city,

        county: content.county,
        is_default: content.isDefault ? 1 : 0,
      };
      if (this.type === "add") {
        addAddress(data).then((res) => {
          if (res.status == 201) {
            // console.log(res);
            this.$toast.success("添加成功");
            setTimeout(() => {
              this.$router.back();
            }, 1000);
          }
        });
      } else {
        updateAddress(this.addressId, data).then((res) => {
          if (res.status == 204) {
            console.log(res);
            this.$toast.success("更新成功");
            setTimeout(() => {
              this.$router.back();
            }, 1000);
          }
        });
      }
    },
    onDelete(content) {
      deleteAddress(this.addressId).then((res) => {
        if (res.status == 204) {
          this.$toast.success("删除成功");
          setTimeout(() => {
            this.$router.back();
          }, 1000);
        }
      });
    },
    onChangeDetail() {},
  },
  components: { NavBar },
};
</script>
<style lang="less" scoped>
.edit {
  /deep/.van-button--danger {
    background-color: #42b983;
    border: 1px solid #42b983;
  }
}
</style>
