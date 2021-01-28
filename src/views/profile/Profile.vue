<!--  -->
<template>
  <div class="profile">
    <nav-bar>
      <template v-slot:default> 个人中心</template>
    </nav-bar>
    <div class="user">
      <div class="place">
        <div><img src="@/assets/img/avatar.png" alt="" /></div>
        <div class="right">
          <p>昵称:{{ userInfo.name }}</p>
          <p>登录名:{{ userInfo.email }}</p>
          <p>个性签名:凡是过往皆为序章</p>
        </div>
      </div>
      <van-cell title="我的收藏" is-link />
      <van-cell title="我的订单" is-link @click="goOrder" />
      <van-cell title="账号管理" is-link />
      <van-cell title="地址管理" is-link @click="addressClick" />
      <van-cell title="关于我们" is-link />
    </div>

    <div style="padding: 0 10px">
      <van-button
        round
        block
        type="info"
        color="#42b983"
        native-type="submit"
        @click="logoOut"
        >退出登录</van-button
      >
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

import { getProfileData } from "@/request/profile";

import { loginOut } from "@/request/user";

export default {
  name: "Profile",
  data() {
    return {
      userInfo: {},
    };
  },
  created() {
    getProfileData().then((res) => {
      // console.log(res);
      this.userInfo = res;
    });
  },
  methods: {
    logoOut() {
      // console.log(1);
      loginOut().then((res) => {
        // console.log(res);
        if (res.status == 204) {
          this.$toast.success("退出登录成功");
          localStorage.removeItem("token");
          setTimeout(() => {
            this.$router.push("/login");
          }, 500);
        }
      });
    },
    addressClick() {
      this.$router.push("/address");
    },
    goOrder() {
      // console.log(1);
      this.$router.push('/order');
    },
  },
  components: { NavBar },
};
</script>
<style lang="less" scoped>
.profile {
  font-size: 14px;
  text-align: left;
  color: #fff;

  .user {
    margin-top: 45px;
    padding: 2%;
    margin-bottom: 10px;
    .place {
      padding: 5px 0 15px 0;
      display: flex;
      align-items: center;
      background-color: #42b983;
      width: 100%;
      border-radius: 5px;
      img {
        margin-left: 10px;
        margin-top: 5px;
        border-radius: 10px;
      }
      .right {
        margin-left: 20px;
        p {
          line-height: 20px;
        }
      }
    }
  }
}
</style>
