<!--  -->
<template>
  <div>
    <nav-bar>
      <template v-slot:default> 个人中心</template>
    </nav-bar>
    <div style="margin-top:100px">
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

import { loginOut } from "@/request/user";
export default {
  name: "Profile",
  data() {
    return {};
  },
  methods: {
    logoOut() {
      // console.log(1);
      loginOut().then(res => {
        // console.log(res);
        if (res.status == 204) {
          this.$toast.success("退出登录成功");
          localStorage.removeItem("token");
          setTimeout(() => {
            this.$router.push("/login");
          }, 500);
        }
      });
    }
  },
  components: { NavBar }
};
</script>
<style scoped></style>
