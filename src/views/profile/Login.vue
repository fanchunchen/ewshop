<!--  -->
<template>
  <div class="login">
    <nav-bar>
      <template v-slot:default>用户登录</template>
    </nav-bar>
    <div style="margin-top:100px;text-align:center">
      <van-image
        width="10rem"
        fit="contain"
        src="https://cdn2.lmonkey.com/94f152aaa94d937ccf5de78f3fcac59f/3b6e32e7bc8145a283431f260c3c1d1a.png"
      />
    </div>
    <div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="userInfo.email"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="userInfo.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div
          @click="$router.push({ path: '/register' })"
          style="font-size:14px;color:#42b983;text-align:left;margin-top:10px"
        >
          没有账号?点击注册
        </div>
        <div style="margin: 16px;">
          <van-button
            round
            block
            type="info"
            color="#42b983"
            native-type="submit"
            >登录</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import { login } from "@/request/user";
export default {
  name: "Login",
  data() {
    return {
      userInfo: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    onSubmit() {
      login(this.userInfo).then(res => {
        // console.log(res);
        window.localStorage.setItem("token", res.access_token);
        (this.userInfo.email = ""),
          (this.userInfo.password = ""),
          this.$toast.success("登陆成功");
        setTimeout(() => {
          this.$router.back();
        }, 500);
      });
    }
  },
  components: { NavBar }
};
</script>
<style scoped></style>
